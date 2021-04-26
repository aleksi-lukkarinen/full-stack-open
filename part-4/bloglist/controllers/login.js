const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../utils/config")
const loginRouter = require("express").Router()
const User = require("../models/user")


loginRouter.post("/", async (request, response) => {
  const { body } = request

  const user = await User.findOne({ username: body.username })
  const correctPasswordGiven = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && correctPasswordGiven)) {
    const e = new Error()
    e.name = "InvalidUsernameOrPasswordError"
    throw e
  }

  const userToReceiveToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(
    userToReceiveToken,
    config.SECRET_KEY,
    { expiresIn: config.AUTH_TOKEN_EXPIRATION_TIME_IN_SECONDS })

  response
    .status(config.HTTP_STATUS_OK)
    .send({ username: user.username, name: user.name, token })
})

module.exports = loginRouter
