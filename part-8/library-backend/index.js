const mongoose = require("mongoose")
const Author = require("./models/Author")
const Book = require("./models/Book")
const { ApolloServer, UserInputError, gql } = require("apollo-server")

const MONGODB_URI =
  "mongodb+srv://Library:I2pJqAl7u5srePsR@free.vdyge.mongodb.net/" +
  "Library?retryWrites=true&w=majority"

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


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
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
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
    addBook: async (root, args) => {
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


      // The rest should be an atomic operation

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

    editAuthor: async (root, args) => {
      if (typeof(args.name) !== "string")
        return null

      if (args.setBornTo === null
        || !Number.isInteger(args.setBornTo)
        || args.setBornTo < 0) {

        throw new UserInputError("The birth year must be a non-negative integer", {
          invalidArgs: args.setBornTo,
        })
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

