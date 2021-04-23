const config = require("../utils/config")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blogToAdd = new Blog(request.body)

  if (!blogToAdd.likes)
    blogToAdd.likes = 0

  const savedBlog = await blogToAdd.save()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(savedBlog.body)
})

module.exports = blogsRouter
