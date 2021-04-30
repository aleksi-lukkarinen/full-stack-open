import React from "react"
import BlogListItem from "./BlogListItem"



const BlogList = ({blogs}) => {
  return (
    <>
      {blogs.map(blog => <BlogListItem key={blog.id} blog={blog} />)}
    </>
  )
}


export default BlogList
