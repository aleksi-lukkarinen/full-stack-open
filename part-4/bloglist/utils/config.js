require("dotenv").config()

const USERNAME_MIN_LENGTH = 3
const PASSWORD_MIN_LENGTH = 3
const SALT_ROUNDS = 10
const AUTH_TOKEN_EXPIRATION_TIME_IN_SECONDS = 60

const ENVIRONMENT_CLASS = process.env.NODE_ENV
const IS_TEST_ENVIRONMENT = ENVIRONMENT_CLASS === "test"

const PORT_TO_LISTEN = process.env.PORT

const SECRET_KEY = IS_TEST_ENVIRONMENT
  ? process.env.TEST_SECRET_KEY
  : process.env.SECRET_KEY

const MONGO_USER_NAME = IS_TEST_ENVIRONMENT
  ? process.env.TEST_MONGO_USER_NAME
  : process.env.MONGO_USER_NAME

const MONGO_PASSWORD = IS_TEST_ENVIRONMENT
  ? process.env.TEST_MONGO_PASSWORD
  : process.env.MONGO_PASSWORD

const MONGO_CLUSTER_NAME = IS_TEST_ENVIRONMENT
  ? process.env.TEST_MONGO_CLUSTER_NAME
  : process.env.MONGO_CLUSTER_NAME

const MONGO_DATABASE_NAME = IS_TEST_ENVIRONMENT
  ? process.env.TEST_MONGO_DATABASE_NAME
  : process.env.MONGO_DATABASE_NAME

const URL_BASE = "/"
const URL_API_ROOT = URL_BASE + "api/"
const URL_API_LOGIN = URL_API_ROOT + "login"
const URL_API_BLOGS = URL_API_ROOT + "blogs"
const URL_API_USERS = URL_API_ROOT + "users"

const EXIT_CODE_FAILURE = 1

const HTTP_STATUS_OK = 200
const HTTP_STATUS_CREATED = 201
const HTTP_STATUS_NO_CONTENT = 204
const HTTP_STATUS_BAD_REQUEST = 400
const HTTP_STATUS_UNAUTHORIZED = 401
const HTTP_STATUS_NOT_FOUND = 404
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500

const HTTP_HEADER_AUTHENTICATE = "WWW-Authenticate"
const HTTP_HEADER_AUTHORIZATION = "Authorization"
const HTTP_AUTH_SCHEME_BEARER = "Bearer"

function errCodeCreatorBasedOn(base) {
  return (offset) => { return base + offset }
}
const cmnErr = errCodeCreatorBasedOn(0)
const authErr = errCodeCreatorBasedOn(100)
const valErr = errCodeCreatorBasedOn(200)

const ERR_UNKNOWN_ENDPOINT = cmnErr(0)

const ERR_INVALID_USERNAME_OR_PASSWORD = authErr(0)
const ERR_MISSING_OR_INVALID_AUTH_TOKEN = authErr(1)
const ERR_EXPIRED_AUTH_TOKEN = authErr(2)
const ERR_BLOG_NOT_OWNED_BY_CURRENT_USER = authErr(3)

const ERR_MALFORMATTED_ID = valErr(0)
const ERR_USER_WITH_USERNAME_EXISTS = valErr(1)
const ERR_USER_WITH_USERNAME_DOES_NOT_EXIST = valErr(2)
const ERR_USERNAME_TOO_SHORT = valErr(3)
const ERR_USERNAME_IS_NOT_STRING = valErr(4)
const ERR_PASSWORD_TOO_SHORT = valErr(5)
const ERR_PASSWORD_IS_NOT_STRING = valErr(6)
const ERR_BLOG_LIST_IS_NOT_ARRAY = valErr(7)

const ErrorMessages = {}
ErrorMessages[ERR_UNKNOWN_ENDPOINT] =
    "Unknown endpoint"

ErrorMessages[ERR_INVALID_USERNAME_OR_PASSWORD] =
    "Invalid username or password"
ErrorMessages[ERR_MISSING_OR_INVALID_AUTH_TOKEN] =
    "User authentication token is missing or invalid"
ErrorMessages[ERR_EXPIRED_AUTH_TOKEN] =
    "User authentication token has expired"
ErrorMessages[ERR_BLOG_NOT_OWNED_BY_CURRENT_USER] =
    "This blog is not owned by the current user, so access to it is denied"

ErrorMessages[ERR_MALFORMATTED_ID] =
    "Malformatted ID value"
ErrorMessages[ERR_USER_WITH_USERNAME_EXISTS] =
    "A user with the given username already exists"
ErrorMessages[ERR_USER_WITH_USERNAME_DOES_NOT_EXIST] =
    "A user with the given username cannot be found"
ErrorMessages[ERR_USERNAME_TOO_SHORT] =
    `A username has to be at least ${USERNAME_MIN_LENGTH} characters long`
ErrorMessages[ERR_USERNAME_IS_NOT_STRING] =
    "Username has to be a string"
ErrorMessages[ERR_PASSWORD_TOO_SHORT] =
    `A password has to be at least ${PASSWORD_MIN_LENGTH} characters long`
ErrorMessages[ERR_PASSWORD_IS_NOT_STRING] =
    "Password has to be a string"
ErrorMessages[ERR_BLOG_LIST_IS_NOT_ARRAY] =
    "Blog list has to be an array"

module.exports = {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  SALT_ROUNDS,
  AUTH_TOKEN_EXPIRATION_TIME_IN_SECONDS,

  ENVIRONMENT_CLASS,
  IS_TEST_ENVIRONMENT,

  PORT_TO_LISTEN,

  SECRET_KEY,
  MONGO_USER_NAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER_NAME,
  MONGO_DATABASE_NAME,

  URL_BASE,
  URL_API_ROOT,
  URL_API_LOGIN,
  URL_API_BLOGS,
  URL_API_USERS,

  EXIT_CODE_FAILURE,

  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,

  HTTP_HEADER_AUTHENTICATE,
  HTTP_HEADER_AUTHORIZATION,
  HTTP_AUTH_SCHEME_BEARER,

  ERR_UNKNOWN_ENDPOINT,

  ERR_INVALID_USERNAME_OR_PASSWORD,
  ERR_MISSING_OR_INVALID_AUTH_TOKEN,
  ERR_EXPIRED_AUTH_TOKEN,
  ERR_BLOG_NOT_OWNED_BY_CURRENT_USER,

  ERR_MALFORMATTED_ID,
  ERR_USER_WITH_USERNAME_EXISTS,
  ERR_USER_WITH_USERNAME_DOES_NOT_EXIST,
  ERR_USERNAME_TOO_SHORT,
  ERR_USERNAME_IS_NOT_STRING,
  ERR_PASSWORD_TOO_SHORT,
  ERR_PASSWORD_IS_NOT_STRING,
  ERR_BLOG_LIST_IS_NOT_ARRAY,

  ErrorMessages,
}
