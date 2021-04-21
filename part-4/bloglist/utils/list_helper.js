const _ = require("lodash")

const FAVORITE_BLOG_FIELD_NAMES = ["title", "author", "likes"]

/* eslint-disable no-unused-vars */
function dummy(blogs) {
  return 1
}

function favoriteBlog(blogs) {
  const favorite = _.maxBy(blogs, b => b.likes)
  if (!favorite)
    return undefined

  return _.pick(
    favorite,
    FAVORITE_BLOG_FIELD_NAMES)
}

function mostBlogs(blogs) {
  const blogCounts = _.countBy(blogs, b => b.author)
  const mostBlogsInfo =
    _.maxBy(Object.entries(blogCounts), x => x[1])
  if (!mostBlogsInfo)
    return undefined

  return {
    author: mostBlogsInfo[0],
    blogs: mostBlogsInfo[1],
  }
}

function totalLikes(blogs) {
  return _.sumBy(blogs, b => b.likes)
}


module.exports = {
  dummy,
  favoriteBlog,
  FAVORITE_BLOG_FIELD_NAMES,
  mostBlogs,
  totalLikes,
}
