const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")

const app = require("./app")



const server = http.createServer(app)

server.listen(config.PORT_TO_LISTEN, () => {
  const msg = `Server running on port ${config.PORT_TO_LISTEN}`
  logger.info(msg)
})
