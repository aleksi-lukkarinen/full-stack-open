const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const User = require("./models/User")
const Author = require("./models/Author")
const Book = require("./models/Book")

const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  gql
} = require("apollo-server")



const BOOK_TITLE_MIN_LENGTH = 2
const AUTHOR_NAME_MIN_LENGTH = 4
const GENRE_MIN_LENGTH = 2
const MSG_ERR_BOOK_TITLE_FORMAT =
      "The book title must be a string of " +
      `at least ${BOOK_TITLE_MIN_LENGTH} non-space characters.`
const MSG_ERR_BOOK_TITLE_UNIQUE =
      "The book title must be unique. " +
      "However, a book with the given title already exists."
const MSG_ERR_AUTHOR_NAME =
      "The author's name must be a string of " +
      `at least ${AUTHOR_NAME_MIN_LENGTH} non-space characters.`
const MSG_ERR_GENRE =
      "Genres must be strings of at least " +
      `${GENRE_MIN_LENGTH} non-space characters.`
const MSG_ERR_PUBL_YEAR =
      "The publication year must be a non-negative integer"
const MSG_ERR_BIRTH_YEAR =
      "The birth year must be a non-negative integer"

const JWT_SECRET = "$$IF_YOU_CAN_SEE_THIS_YOU_ARE_TOO_CLOSE$$"

const MONGODB_URI =
  "mongodb+srv://Library:I2pJqAl7u5srePsR@free.vdyge.mongodb.net/" +
  "Library?retryWrites=true&w=majority"




console.log("Connecting to ", MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB.")
  })
  .catch((error) => {
    console.log("An error occurred while connecting to MongoDB:\n", error.message)
  })

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    me: User
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int
    ): Author
  }
`

const resolvers = {
  Book: {
    author: (book) => {
      return {
        id: book.author.id,
        name: book.author.name,
        born: book.author.born,
        bookCount: book.author.bookCount
      }
    }
  },

  Author: {
    bookCount: async (author) => {
      const booksOfAuthor = await Book.find({author: author.id})
      return booksOfAuthor.length
    }
  },

  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },

    bookCount: () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {
      const searchCriteria = {}

      if (typeof(args.genre) === "string") {
        const genreToFind = args.genre.trim().toLowerCase()
        searchCriteria.genres = {$in: [genreToFind]}
      }

      let books = await Book.find(searchCriteria).populate("author")
      return books
    },

    authorCount: () => Author.collection.countDocuments(),

    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== "secret" ) {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: "1h" })
      const result = { value: token }

      return result
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const bookToAdd = {}

      const raiseInputErr = (msg, invalidArgs) => {
        throw new UserInputError(msg, {invalidArgs})
      }


      // Book's title

      const raiseBookTitleFormatError = () =>
        raiseInputErr(MSG_ERR_BOOK_TITLE_FORMAT, args.title)

      let title = args.title
      if (typeof(title) !== "string") { raiseBookTitleFormatError() }
      title = title.trim()
      if (title.length < BOOK_TITLE_MIN_LENGTH) { raiseBookTitleFormatError() }
      bookToAdd.title = title

      let existingBook = await Book.findOne({ title })
      if (existingBook) {
        raiseInputErr(MSG_ERR_BOOK_TITLE_UNIQUE, args.title)
      }


      // Book's publication year
      if (Number.isInteger(args.published)) {
        if (args.published < 0) {
          raiseInputErr(MSG_ERR_PUBL_YEAR, args.published)
        }

        bookToAdd.published = args.published
      }


      // Book's genres
      bookToAdd.genres = []
      if (Array.isArray(args.genres)) {
        for (const g of args.genres) {
          const raiseGenreError =
                  () => raiseInputErr(MSG_ERR_GENRE, g)

          if (typeof(g) !== "string") { raiseGenreError() }

          const genre = g.trim()
          if (genre.length < GENRE_MIN_LENGTH) { raiseGenreError() }

          const genreLC = genre.toLowerCase()
          if (!bookToAdd.genres.find(x => x === genreLC)) {
            bookToAdd.genres = bookToAdd.genres.concat(genreLC)
          }
        }
      }


      // Author's name

      const raiseAuthorError = () =>
        raiseInputErr(MSG_ERR_AUTHOR_NAME, args.author)

      let authorName = args.author
      if (typeof(authorName) !== "string") { raiseAuthorError() }
      authorName = authorName.trim()
      if (authorName.length < AUTHOR_NAME_MIN_LENGTH) { raiseAuthorError() }


      // The rest *should* be an atomic operation (but isn't)

      const authorInfo = { name: authorName }
      let author = await Author.findOne(authorInfo)
      if (!author) {
        author = new Author(authorInfo)
        author.save()
      }
      bookToAdd.author = author

      const book = new Book(bookToAdd)
      return book.save()
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (typeof(args.name) !== "string")
        return null

      if (args.setBornTo === null
        || !Number.isInteger(args.setBornTo)
        || args.setBornTo < 0) {

        throw new UserInputError(
          MSG_ERR_BIRTH_YEAR,
          { invalidArgs: args.setBornTo })
      }

      const searchCriteria = {name: args.name.trim()}
      const authorToEdit = await Author.findOne(searchCriteria)
      if (!authorToEdit)
        return null

      authorToEdit.born = args.setBornTo

      return authorToEdit.save()
    }
  }
}

const createServerContext = async ({ req }) => {
  const context = {}

  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    try {
      const token = auth.substring(7)
      const decodedToken = jwt.verify(token, JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      context.currentUser = currentUser
    }
    catch (e) {
      const exceptionType = e.name.toLowerCase()
      if (exceptionType !== "jsonwebtokenerror" &&
          exceptionType !== "tokenexpirederror") {
        console.log(e.name)
        console.error(`Current user not identified: ${e.message}`)
      }
    }
  }

  return context
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createServerContext,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
