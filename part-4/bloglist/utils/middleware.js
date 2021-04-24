const config = require("./config")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
  const msg =
  "\nRequest:\n" +
  `  - method: ${request.method}\n` +
  `  - path:   ${request.path}\n`

  logger.info(msg)
  next()
}

const unknownEndpoint = (request, response, next) => {
  const error = new Error()
  error.name = "UnknownEndpointError"
  next(error)
}

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error, request, response, next) => {
  const timestamp = new Date()
  let errorCode = undefined
  let responseStatus = undefined
  let responseData = {}
  if (error.name === "UnknownEndpointError") {
    responseStatus = config.HTTP_STATUS_NOT_FOUND
    errorCode = config.ERR_UNKNOWN_ENDPOINT
    responseData = {
      status: responseStatus,
      errors: [
        {
          errorCode,
          message: config.ErrorMessages[errorCode],
        }
      ]
    }
  }
  else if (error.name === "CastError") {
    if (error.kind === "ObjectId" && error.path === "_id") {
      responseStatus = config.HTTP_STATUS_BAD_REQUEST
      errorCode = config.ERR_MALFORMATTED_ID
      responseData = {
        status: responseStatus,
        errors: [
          {
            errorCode,
            message: config.ErrorMessages[errorCode],
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
    const internalErrors = Object.entries(error.errors)
    const resultErrors = []

    /* eslint-disable-next-line no-unused-vars */
    internalErrors.forEach(([fieldName, fieldError]) => {
      let errorCode = undefined
      const errorProps = fieldError.properties
      if (errorProps) {
        const errorKind = fieldError.kind
        if (errorProps.path === "username") {
          if (errorKind === "required" || errorKind === "minlength") {
            errorCode = config.ERR_USERNAME_TOO_SHORT
          }
          else if (errorKind === "unique") {
            errorCode = config.ERR_USER_WITH_USERNAME_EXISTS
          }
          else if (errorKind === "type") {
            errorCode = config.ERR_USERNAME_IS_NOT_STRING
          }
        }
        else if (errorProps.path === "password") {
          if (errorKind === "required" || errorKind === "minlength") {
            errorCode = config.ERR_PASSWORD_TOO_SHORT
          }
          else if (errorKind === "type") {
            errorCode = config.ERR_PASSWORD_IS_NOT_STRING
          }
        }

        if (errorCode) {
          resultErrors.push({
            errorCode: errorCode,
            message: config.ErrorMessages[errorCode],
            value: errorProps.value,
            originalError: {
              message: errorProps.message,
              kind: errorKind,
              path: errorProps.path,
            },
          })
        }
      }
    })

    if (resultErrors.length > 0) {
      responseStatus = config.HTTP_STATUS_BAD_REQUEST
      responseData = {
        status: responseStatus,
        errors: resultErrors,
      }
    }
  }

  let result = undefined
  if (responseStatus) {
    responseData.timestamp = timestamp
    responseData.method = request.method
    responseData.path = request.url

    logger.error(responseData)

    result = response
      .status(responseStatus)
      .send(responseData)
  }
  else {
    result = response
      .status(config.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .end()

    logger.error(error)
  }

  return result
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}