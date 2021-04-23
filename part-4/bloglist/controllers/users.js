const bcrypt = require("bcrypt")
const config = require("../utils/config")
const usersRouter = require("express").Router()
const User = require("../models/user")


usersRouter.get("/", async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRouter.post("/", async (request, response) => {
  const { body } = request

  if (!body.name ||
    !body.username ||
    !body.password) {

    response.status(config.HTTP_STATUS_BAD_REQUEST).end()
    return
  }

  const passwordHash =
    await bcrypt.hash(body.password, config.SALT_ROUNDS)

  const userToAdd = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await userToAdd.save()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(savedUser)
})

module.exports = usersRouter
