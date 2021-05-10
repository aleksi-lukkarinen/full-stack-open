import React, { useState, useEffect, useRef } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogList from "./BlogList"
import BlogInsertionForm from "./BlogInsertionForm"


const BlogListView = ({
  setInfoMessage,
  setErrorMessage,
  currentUser }) => {

  const { t } = useTranslation()
  const [blogs, setBlogs] = useState([])
  const insertionForm = useRef(null)

  useEffect(() => {
    blogService.getAll().then(foundBlogs =>
      setBlogs(foundBlogs)
    )
  }, [])

  function showInfoMessage(content) {
    setInfoMessage(content)
    setTimeout(() => setInfoMessage(null), 5000)
  }

  function showErrorMessage(content) {
    setErrorMessage(content)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  function handleBlogInsertion(title, author, url) {
    const blogToInsert = { title, author, url, }

    blogService
        .insert(blogToInsert)
        .then(data => {
          setBlogs(blogs.concat(data))

          const msg = t("BlogInsertionForm.msgSuccessfulInsertion", { blogToInsert })
          showInfoMessage(msg)

          insertionForm.current.hide()
          insertionForm.current.clearFields()
        })
        .catch(error => {
          let msg = `Inserting blog "${blogToInsert.title}" failed`

          try {
            if (error.request.status === 400) {
              if (error.request &&
                typeof(error.request.response) === "string" &&
                error.request.response.length > 2) {

                const responseData =
                          JSON.parse(error.request.response)
                if (responseData.errors &&
                      Array.isArray(responseData.errors)) {
                  msg += " for the following reason"
                  if (responseData.errors.length === 1) {
                    msg += ": " + responseData.errors[0].message
                    if (!msg.endsWith("."))
                      msg += "."
                  }
                  else {
                    msg += "s:"
                    for (let i=0; i<responseData.errors.length; i++) {
                      msg += ` (${i + 1}) ` + responseData.errors[Number(i)].message
                      if (!msg.endsWith("."))
                        msg += "."
                    }
                  }
                }
              }
            }
            else if (error.request.status === 401) {
              const responseData =
                        JSON.parse(error.request.response)

              switch (responseData.errors[0].errorCode) {
                case 101:
                  msg += ", because user authentication token is missing. Please log in again."
                  break

                case 102:
                  msg += ", because user authentication is expired. Please log in again."
                  break

                default:
                  msg += " for an unexpected error."
              }
            }
          }
          catch (unexpectedError) {
            console.error(unexpectedError)

            msg += " for an unexpected reason."
          }

          showErrorMessage(msg)
        })
  }

  return (
    <>
      <BlogInsertionForm
        ref={ insertionForm }
        handleBlogInsertion={ handleBlogInsertion } />

      <SectionHeader content={ t("BlogList.title") } />

      <BlogList
        blogs={ blogs }
        setBlogs={ setBlogs }
        currentUser={ currentUser }
        setInfoMessage={ setInfoMessage }
        setErrorMessage={ setErrorMessage } />
    </>
  )
}

BlogListView.propTypes = {
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
}

export default BlogListView
