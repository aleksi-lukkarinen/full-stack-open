const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")
const app = require("./app")


const server = http.createServer(app)

server.on("error", error => {
  const msg = "\nBlogList Server encountered an error:\n"
  logger.error(msg)
  logger.error(error)
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
