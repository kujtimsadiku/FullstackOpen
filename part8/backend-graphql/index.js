const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./schema/mongoBook");
const Author = require("./schema/mongoAuthor");
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
  },
	type Book {
		title: String!
		published: Int!
		author: String!
		genres: [String!]!
    id: ID!
	},
	type Author {
		name: String
		born: Int
		bookCount: Int
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
		): Author
	}
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments,
    authorCount: async () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      if (args.author.length < 4) {
        throw new GraphQLError("Author name is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      try {
        let books = await Book.find({});

        if (args.author) {
          const authorBooks = await Author.findOne({ name: args.author });

          if (authorBooks) {
            books = await Book.find({ author: authorBooks._id });
          } else {
            books = [];
          }
        } else if (args.genres) {
          return await Book.find({ genres: { $all: [args.genres] } });
        }

        return books;
      } catch (error) {
        throw new GraphQLError("Error on fetching allBooks", {
          extensions: {
            code: "ERROR_AT_FETCHING",
            invalidArgs: args.author,
            error,
          },
        });
      }
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
  },
  Mutation: {
    addBook: async (root, args) => {
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

        const book = new Book({ ...args, author: author._id });
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
    editAuthor: async (root, args) => {
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

      try {
        await authorToEdit.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "EDIT_AUTHOR_FAIL",
            error,
          },
        });
      }
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
