const config = require("./config")


const info = (...params) => {
  if (!config.IS_TEST_ENVIRONMENT)
    console.log(...params)
}

const error = (...params) => {
  if (!config.IS_TEST_ENVIRONMENT)
    console.log(...params)
}

module.exports = {
  error,
  info,
}