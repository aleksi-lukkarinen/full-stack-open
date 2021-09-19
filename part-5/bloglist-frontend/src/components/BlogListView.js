import React, { useRef } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import BlogInsertionForm from "./BlogInsertionForm"
import { Link } from "react-router-dom"
import { makeStyles, Typography } from "@material-ui/core"

// eslint-disable-next-line no-unused-vars
import BlogList from "./BlogList"



const useStyles = makeStyles((theme) => ({
  blogName: {
    textDecoration: "initial",
    "&:hover": {
      color: "red",
    },
  }
}))

const BlogListView = ({
  setInfoMessage,
  setErrorMessage,
  blogs,
  setBlogs,
  users,
  setUsers }) => {

  const { t } = useTranslation()
  const classes = useStyles()
  const insertionForm = useRef(null)

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
          setUsers(users.map(u => u.id !== data.user.id ? u :
              { ...u, blogs: u.blogs.concat(data) }))

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
      <SectionHeader
        style={ { paddingBottom: "0.2em" } }
        variant="h1"
        content={ t("BlogList.title") } />

      { !blogs ? <></> :
          <>
            <BlogInsertionForm
              ref={ insertionForm }
              handleBlogInsertion={ handleBlogInsertion } />

            <div style={ { marginTop: "1em" } }>
              {blogs.map(blog => (
                <Link key={ blog.id }
                  to={ `/blogs/${blog.id}` }
                  className={ classes.blogName } >

                  <Typography className={ classes.blogName }>{ blog.title }</Typography>
                </Link>
              ))}
            </div>
          </>
      }
    </>
  )

  /* eslint-disable capitalized-comments */
  //  The old blog list with expandable blog entries:
  //    <BlogList
  //      blogs={ blogs }
  //      setBlogs={ setBlogs }
  //      currentUser={ currentUser }
  //      setInfoMessage={ setInfoMessage }
  //      setErrorMessage={ setErrorMessage } />
  /* eslint-enable capitalized-comments */

}

BlogListView.propTypes = {
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
}

export default BlogListView
