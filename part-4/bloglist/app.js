const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


function buildMongoConnUrl(userName, password, clusterName, databaseName) {
  const url =
      `mongodb+srv://${userName}:${password}` +
      `@${clusterName}.vdyge.mongodb.net/${databaseName}?` +
      "retryWrites=true&w=majority"

  return url
}

const MONGO_CNN_URL = buildMongoConnUrl(
  config.MONGO_USER_NAME, config.MONGO_PASSWORD, config.MONGO_CLUSTER_NAME, config.MONGO_DATABASE_NAME)
const mongoCnnOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

logger.info("Trying to connect to the database...")
mongoose
  .connect(MONGO_CNN_URL, mongoCnnOpts)
  .catch(error => {
    console.error("Connecting to Mongo database failed: ", error.message)
    process.exit(config.EXIT_CODE_FAILURE)
  })

logger.info("Setting up database schemata...")
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model("Blog", blogSchema)


logger.info("Setting up HTTP server...")

const app = express()


app.use(cors())
app.use(express.json())

app.get(config.URL_BLOGS, (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post(config.URL_BLOGS, (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response
        .status(config.HTTP_STATUS_CREATED)
        .json(result)
    })
})

module.exports = app
