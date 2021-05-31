const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb://localhost:27017/fullstackopen'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let author = null
      if (args.author) author = await Author.findOne({ name: args.author })
      if (args.author && !author) return []

      let filter = {}
      if (args.author) filter = { author: author.id }
      if (args.genre) filter = { genres: { $elemMatch: { $eq: args.genre } } }
      if (args.author && args.genre)
        filter = {
          author: author.id,
          genres: { $elemMatch: { $eq: args.genre } },
        }

      return await Book.find(filter).populate('author')
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        })
        await author.save()
      }
      let book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      })
      await book.save()
      book = await book.populate('author').execPopulate()
      return book
    },
    editAuthor: async (root, args) => {
      const authorExist = await Author.findOne({ name: args.name })
      if (!authorExist) {
        return null
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
