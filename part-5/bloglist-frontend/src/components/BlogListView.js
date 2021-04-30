import React, { useState, useEffect } from "react"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogList from "./BlogList"
import BlogInsertionForm from "./BlogInsertionForm"


const BlogListView = ({
  viewTitle,
  setInfoMessage,
  setErrorMessage}) => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div className="contentContainer">
      <SectionHeader
        content={viewTitle}
        isFirst={true} />

      <BlogList blogs={blogs} />

      <BlogInsertionForm
        formTitle="Insert a New Blog"
        blogs={blogs} setBlogs={setBlogs}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage} />
    </div>
  )
}


export default BlogListView
