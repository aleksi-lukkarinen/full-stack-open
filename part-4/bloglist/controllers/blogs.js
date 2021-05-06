const config = require("../utils/config")
const middleware = require("../utils/middleware")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { body, user } = request

  if (!body.title) {
    const e = new Error()
    e.name = "BlogTitleIsMissingError"
    throw e
  }

  if (!body.url) {
    const e = new Error()
    e.name = "BlogUrlIsMissingError"
    throw e
  }

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

  const blogToReturn = await savedBlog
    .populate("user", { username: 1, name: 1 })
    .execPopulate()

  response
    .status(config.HTTP_STATUS_CREATED)
    .json(blogToReturn)
})

blogsRouter.get("/:id", async (request, response) => {
  const idOfBlogToRetrieve = request.params.id
  const blog = await Blog
    .findById(idOfBlogToRetrieve)
    .populate("user", { username: 1, name: 1 })

  if (blog) {
    response.json(blog)
  }
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

  const updatedNote = await Blog
    .findByIdAndUpdate(idOfBlogToUpdate, updateData, { new: true })
    .populate("user", { username: 1, name: 1 })

  response.json(updatedNote)
})

blogsRouter.delete("/:id", middleware.userExtractor,
  async (request, response) => {
    const idOfBlogToDelete = request.params.id

    const blogToDelete = await Blog.findById(idOfBlogToDelete)
    if (blogToDelete) {
      if (blogToDelete.user.toString() !== request.user.id.toString()) {
        const e = new Error()
        e.name = "BlogNotOwnedByCurrentUserError"
        throw e
      }
      await blogToDelete.delete()
    }

    response.status(config.HTTP_STATUS_NO_CONTENT).end()
  }
)

module.exports = blogsRouter
