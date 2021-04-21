const config = require("../utils/config")
const logger = require("../utils/logger")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post("/:id", (request, response) => {
  const blogToAdd = new Blog(request.body)

  blogToAdd
    .save()
    .then(result => {
      response
        .status(config.HTTP_STATUS_CREATED)
        .json(result)
    })
})

module.exports = blogsRouter
