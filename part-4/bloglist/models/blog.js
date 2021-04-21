const logger = require("../utils/logger")
const mongoose = require("mongoose")


logger.info("Setting up Blog database schema...")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
