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
    return response.status(config.HTTP_STATUS_UNAUTHORIZED)
      .set("WWW-Authenticate", "Bearer")
      .json({ error: "invalid username or password" })
  }

  const userToReceiveToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(
    userToReceiveToken,
    config.SECRET_KEY,
    { expiresIn: 60 })

  response
    .status(config.HTTP_STATUS_OK)
    .send({ username: user.username, name: user.name, token })
})

module.exports = loginRouter
