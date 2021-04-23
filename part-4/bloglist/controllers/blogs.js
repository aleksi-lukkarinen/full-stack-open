const config = require("../utils/config")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blogToAdd = new Blog(request.body)

  if (!blogToAdd.title || !blogToAdd.url) {
    response.status(config.HTTP_STATUS_BAD_REQUEST).end()
    return
  }

  if (!blogToAdd.likes)
    blogToAdd.likes = 0

  const savedBlog = await blogToAdd.save()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(savedBlog.body)
})

blogsRouter.put("/:id", async (request, response) => {
  const idOfBlogToUpdate = request.params.id
  const body = request.body
  const updateData = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  }

  const updatedNote = await Blog.findByIdAndUpdate(
    idOfBlogToUpdate, updateData, { new: true })

  response.json(updatedNote)
})

blogsRouter.delete("/:id", async (request, response) => {
  const idOfBlogToDelete = request.params.id
  await Blog.findByIdAndDelete(idOfBlogToDelete)
  response.status(config.HTTP_STATUS_NO_CONTENT).end()
})

module.exports = blogsRouter
