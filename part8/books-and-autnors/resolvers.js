require('dotenv').config();
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const pubsub = new PubSub();

const findOrCreate = async (name) => {
  let author = await Author.findOne({ name });

  if (!author) {
    author = new Author({ name });
    await author.save();
  }

  return author;
};

let books;

module.exports = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {};

      if (author) {
        const theAuthor = await Author.findOne({ name: author });
        query.author = theAuthor.id;
      }

      if (genre) {
        query.genres = { $in: [genre] };
      }

      return Book.find(query).populate('author');
    },
    allAuthors: async () => {
      books = await Book.find();
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => books.filter((book) => String(book.author) === String(root.id)).length,
  },

  Mutation: {
    addBook: async (root, { title, author, published, genres }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const book = new Book({ title, published, genres });

      try {
        book.author = await findOrCreate(author);
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { title, author, published, genres },
        });
      }

      book = await Book.findById(book.id).populate('author');
      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
      },
    },

    editAuthor: async (root, { name, setToBorn }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name });
      author.born = setToBorn;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { name, setToBorn },
        });
      }

      return author;
    },

    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { username, favoriteGenre },
        });
      }
      return user;
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'password') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};
