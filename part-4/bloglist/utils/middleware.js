const _ = require("lodash")
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
  let responseHeadersToSet = {}
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
  else if (error.name === "InvalidUsernameOrPasswordError") {
    responseStatus = config.HTTP_STATUS_UNAUTHORIZED
    errorCode = config.ERR_INVALID_USERNAME_OR_PASSWORD
    responseHeadersToSet[config.HTTP_HEADER_AUTHENTICATE] =
      config.HTTP_AUTH_SCHEME_BEARER
    responseData = {
      status: responseStatus,
      errors: [
        {
          errorCode,
          message: config.ErrorMessages[errorCode],
          originalError: {
            message: error.message,
          },
        }
      ]
    }
  }
  else if (error.name === "JsonWebTokenError") {
    responseStatus = config.HTTP_STATUS_UNAUTHORIZED
    errorCode = config.ERR_MISSING_OR_INVALID_AUTH_TOKEN
    responseHeadersToSet[config.HTTP_HEADER_AUTHENTICATE] =
      config.HTTP_AUTH_SCHEME_BEARER
    responseData = {
      status: responseStatus,
      errors: [
        {
          errorCode,
          message: config.ErrorMessages[errorCode],
          originalError: {
            message: error.message,
          },
        }
      ]
    }
  }
  else if (error.name === "TokenExpiredError") {
    responseStatus = config.HTTP_STATUS_UNAUTHORIZED
    errorCode = config.ERR_EXPIRED_AUTH_TOKEN
    responseHeadersToSet[config.HTTP_HEADER_AUTHENTICATE] =
      config.HTTP_AUTH_SCHEME_BEARER
    responseData = {
      status: responseStatus,
      errors: [
        {
          errorCode,
          message: config.ErrorMessages[errorCode],
          originalError: {
            message: error.message,
          },
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
      if (fieldError.name === "CastError") {
        const errorCode = config.ERR_MALFORMATTED_ID
        const errorData = {
          errorCode,
          message: config.ErrorMessages[errorCode],
          value: fieldError.value,
          originalError: {
            message: fieldError.message,
            kind: fieldError.kind,
            path: fieldError.path,
          },
        }

        resultErrors.push(errorData)
      }
      else if (fieldError.name === "ValidatorError") {
        const errorProps = fieldError.properties
        const errorData = {
          value: errorProps.value,
          originalError: {
            message: errorProps.message,
            kind: fieldError.kind,
            path: errorProps.path,
          },
        }

        const pathKindToErrorCodeMapping = {
          username: {
            required: config.ERR_USERNAME_TOO_SHORT,
            minlength: config.ERR_USERNAME_TOO_SHORT,
            unique: config.ERR_USER_WITH_USERNAME_EXISTS,
            type: config.ERR_USERNAME_IS_NOT_STRING,
          },
          password: {
            required: config.ERR_PASSWORD_TOO_SHORT,
            minlength: config.ERR_PASSWORD_TOO_SHORT,
            type: config.ERR_PASSWORD_IS_NOT_STRING,
          },
          blogs: {
            type: config.ERR_BLOG_LIST_IS_NOT_ARRAY,
          }
        }
        const mapReader = _.property(errorProps.path + "." + fieldError.kind)
        const errorCode = mapReader(pathKindToErrorCodeMapping)
        if (errorCode) {
          errorData.errorCode = errorCode
          errorData.message = config.ErrorMessages[errorCode]
        }

        resultErrors.push(errorData)
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

    const headers = _.toPairs(responseHeadersToSet)
    headers.forEach(([ name, value ]) => {
      response.set(name, value)
    })
    result = response
      .status(responseStatus)
      .send(responseData)
  }
  else {
    result = response
      .status(config.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .end()

    logger.error("AN UNEXPECTED ERROR FROM THE GENERAL ERROR HANDLER:")
    logger.error(error)
  }

  return result
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}