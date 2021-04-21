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

function totalLikes(blogs) {
  return _.sumBy(blogs, b => b.likes)
}


module.exports = {
  dummy,
  favoriteBlog,
  FAVORITE_BLOG_FIELD_NAMES,
  totalLikes,
}
