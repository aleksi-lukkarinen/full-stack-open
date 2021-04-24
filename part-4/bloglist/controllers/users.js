const bcrypt = require("bcrypt")
const config = require("../utils/config")
const usersRouter = require("express").Router()
const User = require("../models/user")


usersRouter.get("/", async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRouter.post("/", async (request, response, next) => {
  const { body } = request

  function orderCreationOfValidationError(
    fieldName, kind, value) {

    const err = new Error()
    err.name = "ValidationError"
    err.errors = {}
    err.errors[fieldName] = {
      kind: kind,
      properties: {
        message: undefined,
        path: fieldName,
        value: value,
      },
    }

    next(err)
  }

  if (!body.username) {
    orderCreationOfValidationError(
      "username", "required", body.username)
    return
  }
  else if (typeof(body.username) !== "string") {
    orderCreationOfValidationError(
      "username", "type", body.username)
    return
  }

  if (!body.password) {
    orderCreationOfValidationError(
      "password", "required", body.password)
    return
  }
  else if (typeof(body.password) !== "string") {
    orderCreationOfValidationError(
      "password", "type", body.password)
    return
  }
  else if (body.password.length < config.PASSWORD_MIN_LENGTH) {
    orderCreationOfValidationError(
      "password", "minlength", body.password)
    return
  }

  const passwordHash =
    await bcrypt.hash(body.password, config.SALT_ROUNDS)

  const userToInsert = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await userToInsert.save()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(savedUser)
})

module.exports = usersRouter
