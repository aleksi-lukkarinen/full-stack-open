const config = require("../utils/config")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")


blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const { body } = request

  if (!body.title || !body.url) {
    response.status(config.HTTP_STATUS_BAD_REQUEST).end()
    return
  }

  const user = await User.findOne({})

  const blogToInsert = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blogToInsert.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const idOfBlogToRetrieve = request.params.id
  const blog = await Blog.findById(idOfBlogToRetrieve)
  if (blog)
    response.json(blog)
  else
    response.status(config.HTTP_STATUS_NOT_FOUND).end()
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
