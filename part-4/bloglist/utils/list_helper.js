const _ = require("lodash")

/* eslint-disable no-unused-vars */
function dummy(blogs) {
  return 1
}

function totalLikes(blogs) {
  return _.sumBy(blogs, b => b.likes)
}



module.exports = {
  dummy,
  totalLikes,
}
