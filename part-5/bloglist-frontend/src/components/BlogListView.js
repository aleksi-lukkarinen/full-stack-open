import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogList from "./BlogList"
import BlogInsertionForm from "./BlogInsertionForm"


const BlogListView = ({
  setInfoMessage,
  setErrorMessage}) => {

  const {t} = useTranslation()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      <BlogInsertionForm
        blogs={blogs} setBlogs={setBlogs}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage} />

      <SectionHeader content={t("BlogList.title")} />

      <BlogList blogs={blogs} />
    </>
  )
}


export default BlogListView
