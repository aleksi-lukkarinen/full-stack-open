const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")
const app = require("./app")


const server = http.createServer(app)

server.on("error", error => {
  let msg = "\nBlogList Server encountered an error:\n"
  logger.error(msg)

  if (error.code === "EADDRINUSE") {
    msg = "The defined TCP port is in use already.\n"
    logger.error(msg)
  }
  else {
    logger.error(error)
  }

  process.exit(config.EXIT_CODE_FAILURE)
})

server.on("close", () => {
  const msg = "\nBlogList Server is shutting down\n"
  logger.info(msg)
})

logger.info(`  - Trying TCP port ${config.PORT_TO_LISTEN}`)
server.listen(config.PORT_TO_LISTEN, () => {
  const msg = `\nBlogList Server is listening on port ${config.PORT_TO_LISTEN}\n`
  logger.info(msg)
})
