const config = require("../utils/config")
const testingRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")


testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(config.HTTP_STATUS_OK).end()
})

module.exports = testingRouter
