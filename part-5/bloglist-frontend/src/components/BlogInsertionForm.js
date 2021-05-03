import React, {useState} from 'react'
import {useField} from "../hooks"
import BlogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import SimpleForm from './SimpleForm'
import SimpleFormRow from './SimpleFormRow'
import Showable from './Showable'


const BlogInsertionForm = ({
        formTitle,
        blogs, setBlogs,
        setInfoMessage,
        setErrorMessage}) => {

  const [isFormVisible, setFormVisibility] = useState(false)

  const {reset:resetNewBlogTitle, ...newBlogTitle} =
    useField("txtNewBlogTitle", "text")
  const {reset:resetNewBlogAuthor, ...newBlogAuthor} =
    useField("txtNewBlogAuthor", "text")
  const {reset:resetNewBlogUrl, ...newBlogUrl} =
    useField("txtNewBlogUrl", "text")

  function showInfoMessage(content) {
    setInfoMessage(content)
    setTimeout(() => setInfoMessage(null), 5000)
  }

  function showErrorMessage(content) {
    setErrorMessage(content)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  function insertBlog(event) {
    event.preventDefault()

    const blogToInsert = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
    }

    BlogService
      .insert(blogToInsert)
      .then(data => {
        setBlogs(blogs.concat(data))

        showInfoMessage(
          `Entry "${blogToInsert.title}" was successfully inserted.`)

        setFormVisibility(false)
        clearFields()
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
                    msg += ` (${i + 1}) ` + responseData.errors[i].message
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

  function showInsertionForm() {
    setFormVisibility(true)
  }

  function visibilityChanged() {
    if (isFormVisible) {
      const field = newBlogTitle.ref.current
      field.focus()
    }
  }

  function cancelInsertion(event) {
    event.preventDefault()

    setFormVisibility(false)
    clearFields()
  }

  function clearFields() {
    resetNewBlogTitle()
    resetNewBlogAuthor()
    resetNewBlogUrl()
  }

  return (
    <>
      <Showable
        afterUpdate={visibilityChanged}
        isVisible={isFormVisible}
        showContent={showInsertionForm}
        buttonLabel="Insert a New Blog..."
        buttonId="cmdShowBlogInsertionForm">

        <SectionHeader content={formTitle} isFirst={true} />

        <SimpleForm
          submitTitle="Insert" onSubmit={insertBlog}
          cancelTitle="Cancel" onCancel={cancelInsertion} >

          <SimpleFormRow>
            <label htmlFor={newBlogTitle.id}>Title</label>
            <input {...newBlogTitle} />
          </SimpleFormRow>
          <SimpleFormRow>
            <label htmlFor={newBlogAuthor.id}>Author</label>
            <input {...newBlogAuthor} autoComplete="name" />
          </SimpleFormRow>
          <SimpleFormRow>
            <label htmlFor={newBlogUrl.id}>URL</label>
            <input {...newBlogUrl} autoComplete="url" />
          </SimpleFormRow>
        </SimpleForm>
      </Showable>
    </>
  )
}

export default BlogInsertionForm
