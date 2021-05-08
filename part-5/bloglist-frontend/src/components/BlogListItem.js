import React, { useState } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import BlogService from "../services/blogService"
import BrToHide from "./BrToHide"


const BlogListItem = ({
  blog,
  blogs, setBlogs,
  currentUser,
  setInfoMessage, setErrorMessage,
}) => {

  const { t } = useTranslation()
  const [blogDetailsAreVisible, setDetailVisibility] = useState(false)

  const visibilityButtonTitleKey =
    blogDetailsAreVisible ? "hide" : "show"
  const visibilityButtonTitle =
    t(`BlogListItem.btnDetailVisibility.${visibilityButtonTitleKey}`)

  const showAuthor = blog.author && blog.author.length > 0

  const showDelete = currentUser &&
      (blog.user.id.toString() === currentUser.id.toString())

  function toggleDetailVisibility(event) {
    event.preventDefault()
    setDetailVisibility(!blogDetailsAreVisible)
  }

  function addLike(event) {
    event.preventDefault()

    const sourceButton = event.target

    sourceButton.disabled = true

    BlogService
        .like(blog)
        .then(updatedBlog => {
          const allBlogs =
            blogs.map(x => x.id === blog.id ? updatedBlog : x)
          setBlogs(allBlogs)
        })
        .finally(() => {
          sourceButton.disabled = false
        })
  }

  function deleteBlog(event) {
    event.preventDefault()

    const msgConfirmation = blog.author
      ? t("BlogListItem.confirmDeletionWithAuthor", {
        title: blog.title,
        author: blog.author,
      })
      : t("BlogListItem.confirmDeletionWithoutAuthor", {
        title: blog.title,
      })

    // eslint-disable-next-line no-alert
    const blogShouldNotBeDeleted = !window.confirm(msgConfirmation)
    if (blogShouldNotBeDeleted)
      return

    BlogService
        .delete(blog)
        .then(result => {
          const msg = `Blog "${blog.title}" was successfully deleted.`
          setInfoMessage(msg)
          setTimeout(() => setInfoMessage(null), 5000)
        })
        .catch(error => {
          const msg = `Unable to delete blog ${blog.title} from the server. ` +
                      "Maybe it was deleted earlier or did never exist."
          setErrorMessage(msg)
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .finally(setBlogs(blogs.filter(b => b.id !== blog.id)))
  }

  return (
    <>
      <div className="blogListItem">
        <div className="pnlButtons">
          <button
            type="button"
            className="btnDetailVisibility"
            onClick={ toggleDetailVisibility }>

            {visibilityButtonTitle}
          </button>
        </div>
        <div className="header">
          <div className="blogTitle">{blog.title}</div>
          {showAuthor &&
            <div className="blogAuthor">{blog.author}</div>
          }
        </div>
        {blogDetailsAreVisible &&
          <>
            <div className="blogUrl">{blog.url}</div>
            <div className="footer">
              <div className="adder">{blog.user.name}</div>
              <div className="blogLikes" data-likes={ blog.likes }>
                {t("BlogListItem.likes", { "count": blog.likes })}
                <button
                  type="button"
                  className="btnLike"
                  onClick={ addLike }>

                  {t("BlogListItem.btnLike")}
                </button>
              </div>
              {showDelete &&
                <div className="blogDeletion">
                  <button
                    type="button"
                    className="btnDelete"
                    onClick={ deleteBlog }>

                    {t("BlogListItem.btnDelete")}
                  </button>
                </div>
              }
            </div>
          </>
        }
      </div>
      <BrToHide />
    </>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default BlogListItem
