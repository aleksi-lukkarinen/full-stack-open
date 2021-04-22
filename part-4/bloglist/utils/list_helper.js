const _ = require("lodash")

const FAVORITE_BLOG_FIELD_NAMES = ["title", "author", "likes"]

/* eslint-disable no-unused-vars */
function dummy(blogs) {
  return 1
}

function favoriteBlog(blogs) {
  const favorite = _.maxBy(blogs, "likes")
  if (!favorite)
    return undefined

  return _.pick(
    favorite,
    FAVORITE_BLOG_FIELD_NAMES)
}

function mostBlogs(blogs) {
  const blogCounts = _.countBy(blogs, "author")
  const mostBlogsInfo =
    _.maxBy(_.toPairs(blogCounts), x => x[1])
  if (!mostBlogsInfo)
    return undefined

  return {
    author: mostBlogsInfo[0],
    blogs: mostBlogsInfo[1],
  }
}

function mostLikes(blogs) {
  const likeCounts = _.mapValues(
    _.groupBy(blogs, "author"),
    x => _.sumBy(x, "likes"))

  const mostLikesInfo =
    _.maxBy(_.toPairs(likeCounts), x => x[1])
  if (!mostLikesInfo)
    return undefined

  return {
    author: mostLikesInfo[0],
    likes: mostLikesInfo[1],
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
  mostLikes,
  totalLikes,
}
