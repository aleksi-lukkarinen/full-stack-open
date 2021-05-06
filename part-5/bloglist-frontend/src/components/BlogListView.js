import React, { useState, useEffect } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogList from "./BlogList"
import BlogInsertionForm from "./BlogInsertionForm"


const BlogListView = ({
  setInfoMessage,
  setErrorMessage }) => {

  const { t } = useTranslation()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(foundBlogs =>
      setBlogs(foundBlogs)
    )
  }, [])

  return (
    <>
      <BlogInsertionForm
        blogs={ blogs } setBlogs={ setBlogs }
        setInfoMessage={ setInfoMessage }
        setErrorMessage={ setErrorMessage } />

      <SectionHeader content={ t("BlogList.title") } />

      <BlogList
        blogs={ blogs }
        setBlogs={ setBlogs } />
    </>
  )
}

BlogListView.propTypes = {
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default BlogListView
