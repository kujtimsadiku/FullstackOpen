const Book = require("./schema/mongoBook");
const Author = require("./schema/mongoAuthor");
const User = require("./schema/mongoUser");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
        if (args.genres !== "all genres") query.genres = { $in: [args.genres] };
      }

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
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

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
    removeBook: async (root, args) => {
      // add later maybe the context for authentication to remove
      const book = await Book.findByIdAndRemove(args.id);

      return book;
    },
    removeAuthor: async (root, args) => {
      // add later maybe the context for authentication to remove
      const author = await Author.findByIdAndRemove(args.id);
      await Book.findByIdAndRemove({ author: author.id });

      return author;
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
