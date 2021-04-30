import React, { useState, useEffect } from "react"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogList from "./BlogList"
import BlogInsertionForm from "./BlogInsertionForm"


const BlogListView = ({children}) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div className="contentContainer">
      <SectionHeader isFirst={true}>
        {children}
      </SectionHeader>

      <BlogList blogs={blogs} />

      <BlogInsertionForm
        formTitle="Insert a New Blog"
        blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}


export default BlogListView
