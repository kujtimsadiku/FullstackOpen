const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const jwt = require("jsonwebtoken");

const Book = require("./schema/mongoBook");
const Author = require("./schema/mongoAuthor");
const User = require("./schema/mongoUser");

const { GraphQLError } = require("graphql");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connection to MongoDB", error.message);
  });

const typeDefs = `
  type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genres: String): [Book]
		allAuthors: [Author]
    me: User
  },
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
    id: ID!
	},
	type Author {
		name: String
		born: Int
		bookCount: Int
    id: ID!
	},
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  },
  type Token {
    value: String!
  },
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book,
		editAuthor(
			name: String!
			born: Int
		): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
	}
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments,
    authorCount: async () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      if (!args.author && !args.genres) {
        // to optimize the code
        return await Book.find({}).populate("author");
      }

      // to check the input is bigger or equal to 4 if not return error
      if (args.author && args.author.length < 4) {
        throw new GraphQLError("Author name is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      const authorBooks = await Author.findOne({ name: args.author });
      // to check if the name of the author couldn't be found if its null we continue
      if (!authorBooks && args.author) {
        throw new GraphQLError("Author was not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      const query = {};

      if (authorBooks) {
        query.author = authorBooks._id;
      }
      if (args.genres) {
        query.genres = { $in: [args.genres] };
      }

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books", // The name of the 'books' collection
            localField: "_id", // The field to match in the 'authors' collection
            foreignField: "author", // The field to match in the 'books' collection
            as: "books",
          },
        },
        {
          $project: {
            name: 1,
            born: 1,
            bookCount: { $size: "$books" }, // Count the size of the 'books' array
          },
        },
      ]);
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(1);
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_AUTHENTICATION",
          },
        });
      }

      if (args.title.length < 5) {
        throw new GraphQLError("Book title is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({
            name: args.author,
            bookCount: 1,
          });
        } else {
          author.bookCount = (author.bookCount || 0) + 1;
        }

        await author.save();

        const book = new Book({ ...args, author: author });
        await book.save();

        return book;
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_AUTHENTICATION",
          },
        });
      }

      if (!args.born) {
        throw new GraphQLError("Born: is empty please add a value", {
          extensions: {
            code: "BAD_BORN_VALUE",
            invalidArgs: args.setBornTo + " born is empty",
          },
        });
      }

      const authorToEdit = await Author.findOne({ name: args.name });

      if (!authorToEdit) {
        throw new GraphQLError("Author was not found", {
          extensions: {
            code: "BAD_AUTHOR_NOT_FOUND",
            invalidArgs: args.name,
          },
        });
      }

      authorToEdit.born = args.born;
      authorToEdit.bookCount = await Book.countDocuments({
        author: authorToEdit._id,
      });

      try {
        await authorToEdit.save();
        //
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "SAVING_AUTHOR_FAILED",
            error,
          },
        });
      }
      return authorToEdit;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return await user.save().catch((error) => {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = { username: user.username, id: user._id };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
