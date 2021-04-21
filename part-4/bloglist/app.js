const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")


function buildMongoConnUrl(userName, password, clusterName, databaseName) {
  const url =
      `mongodb+srv://${userName}:${password}` +
      `@${clusterName}.vdyge.mongodb.net/${databaseName}?` +
      "retryWrites=true&w=majority"

  return url
}

const MONGO_CNN_URL =
  buildMongoConnUrl(
    config.MONGO_USER_NAME,
    config.MONGO_PASSWORD,
    config.MONGO_CLUSTER_NAME,
    config.MONGO_DATABASE_NAME)

const mongoCnnOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

logger.info("Connecting to Mongo database")
logger.info(`  - Cluster: ${config.MONGO_CLUSTER_NAME}`)
logger.info(`  - Database: ${config.MONGO_DATABASE_NAME}`)
logger.info(`  - User: ${config.MONGO_USER_NAME}`)
mongoose
  .connect(MONGO_CNN_URL, mongoCnnOpts)
  .then(() => {
    const msg = "Connection to Mongo database succeeded"
    logger.error(msg)
  })
  .catch(error => {
    const msg = "Connection to Mongo database failed: "
    logger.error(msg, error.message)
    process.exit(config.EXIT_CODE_FAILURE)
  })



logger.info("Setting up HTTP server")

logger.info(`  - Initializing Express`)
const app = express()
app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(config.URL_API_BLOGS, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app