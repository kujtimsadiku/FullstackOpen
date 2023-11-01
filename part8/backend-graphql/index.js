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

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// let books = [
// {
//   title: "Clean Code",
//   published: 2008,
//   author: "Robert Martin",
//   id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//   genres: ["refactoring"],
// },
// {
//   title: "Agile software development",
//   published: 2002,
//   author: "Robert Martin",
//   id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//   genres: ["agile", "patterns", "design"],
// },
// {
//   title: "Refactoring, edition 2",
//   published: 2018,
//   author: "Martin Fowler",
//   id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//   genres: ["refactoring"],
// },
// {
//   title: "Refactoring to patterns",
//   published: 2008,
//   author: "Joshua Kerievsky",
//   id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//   genres: ["refactoring", "patterns"],
// },
// {
//   title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//   published: 2012,
//   author: "Sandi Metz",
//   id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//   genres: ["refactoring", "design"],
// },
// {
//   title: "Crime and punishment",
//   published: 1866,
//   author: "Fyodor Dostoevsky",
//   id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//   genres: ["classic", "crime"],
// },
// {
//   title: "The Demon ",
//   published: 1872,
//   author: "Fyodor Dostoevsky",
//   id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//   genres: ["classic", "revolution"],
// },
// ];

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
			setBornTo: Int
		): Author
	}
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments,
    authorCount: async () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
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
            code: "BAD_USER_INPUT",
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
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: (root, args) => {
      if (!args.setBornTo) {
        return null;
      }

      const authorIndex = authors.findIndex(
        (author) => author.name === args.name
      );
      authors[authorIndex].born = args.setBornTo;

      return authors[authorIndex];
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
