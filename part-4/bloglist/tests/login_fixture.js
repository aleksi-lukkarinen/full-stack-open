const jwt = require("jsonwebtoken")
const config = require("../utils/config")


function generateTestAuthTokenFor(user) {
  const userToReceiveToken = {
    id: user._id || user.id,
    username: user.username,
  }

  const token = jwt.sign(
    userToReceiveToken,
    config.SECRET_KEY,
    { expiresIn: config.AUTH_TOKEN_EXPIRATION_TIME_IN_SECONDS })

  return token
}


module.exports = {
  generateTestAuthTokenFor,
}