require("dotenv").config()

const PORT_TO_LISTEN = process.env.PORT

const MONGO_USER_NAME = process.env.MONGO_USER_NAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_CLUSTER_NAME = process.env.MONGO_CLUSTER_NAME
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME

const EXIT_CODE_FAILURE = 1

const URL_BASE = "/"
const URL_API_ROOT = URL_BASE + "api/"
const URL_BLOGS = URL_API_ROOT + "blogs"



console.log("Setting up HTTP server...")

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


function buildMongoConnUrl(userName, password, clusterName, databaseName) {
  const url =
      `mongodb+srv://${userName}:${password}` +
      `@${clusterName}.vdyge.mongodb.net/${databaseName}?` +
      "retryWrites=true&w=majority"

  return url
}

const MONGO_CNN_URL = buildMongoConnUrl(
  MONGO_USER_NAME, MONGO_PASSWORD, MONGO_CLUSTER_NAME, MONGO_DATABASE_NAME)
const mongoCnnOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

console.log("Trying to connect to the database...")
mongoose
  .connect(MONGO_CNN_URL, mongoCnnOpts)
  .catch(error => {
    console.error("Connecting to Mongo database failed: ", error.message)
    process.exit(EXIT_CODE_FAILURE)
  })

console.log("Setting up database schemata...")
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)



app.use(cors())
app.use(express.json())

app.get(URL_BLOGS, (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post(URL_BLOGS, (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT_TO_LISTEN, () => {
  console.log(`Server running on port ${PORT_TO_LISTEN}`)
})

