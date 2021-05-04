import React from "react"

import PropTypes from "prop-types"


const BlogListItem = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem
