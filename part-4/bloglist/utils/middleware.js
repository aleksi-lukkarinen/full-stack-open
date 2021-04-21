const config = require("./config")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
  const msg =
  `\nRequest:\n` +
  `  - method: ${request.method}\n` +
  `  - path:   ${request.path}\n`

  logger.info(msg)
  next()
}

const unknownEndpoint = (request, response, next) => {
  const error = new Error("Unknown endpoint")
  error.name = "UnknownEndpointError"
  next(error)
}

const errorHandler = (error, request, response, next) => {
  const timestamp = new Date()

  console.error(error)

  let responseStatus = undefined
  let responseData = {}
  if (error.name === "UnknownEndpointError") {
    responseStatus = config.HTTP_STATUS_NOT_FOUND
    responseData = {
      status: responseStatus,
      errors: [
        {
          message: error.message,
          method: request.method,
          path: request.url,
        }
      ]
    }
  }
  else if (error.name === "CastError") {
    if (error.kind === "ObjectId" && error.path === "_id") {
      responseStatus = config.HTTP_STATUS_BAD_REQUEST
      responseData = {
        status: responseStatus,
        errors: [
          {
            message: "Malformatted ID",
            originalError: {
              message: error.message,
              reason: error.reason.message,
              value: error.value,
            },
          }
        ],
      }
    }
  }
  else if (error.name === "ValidationError") {
    responseStatus = config.HTTP_STATUS_BAD_REQUEST
    responseData = {
      status: responseStatus,
      errors: [
        {
          message: error.message,
        }
      ],
    }
  }

  let result = undefined
  if (responseStatus) {
    responseData.timestamp = timestamp

    result = response
      .status(responseStatus)
      .send(responseData)
  }
  else {
    result = response
      .status(config.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .end()
  }

  return result
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}