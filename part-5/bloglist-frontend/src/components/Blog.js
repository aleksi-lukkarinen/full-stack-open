import React from "react"


const BlogListItem = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>
)


export default BlogListItem
