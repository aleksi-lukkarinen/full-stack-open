import React, { useState, useRef } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import BlogService from "../services/blogService"
import BrToHide from "./BrToHide"


const BlogListItem = ({ blog, blogs, setBlogs }) => {
  const { t } = useTranslation()
  const likeButton = useRef(null)
  const [blogDetailsAreVisible, setDetailVisibility] = useState(false)

  const visibilityButtonTitleKey =
    blogDetailsAreVisible ? "hide" : "show"
  const visibilityButtonTitle =
    t(`BlogListItem.btnDetailVisibility.${visibilityButtonTitleKey}`)

  const showAuthor = blog.author && blog.author.length > 0

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
              <div className="blogLikes">
                {t("BlogListItem.likes", { "count": blog.likes })}
                <button
                  type="button"
                  ref={ likeButton }
                  className="btnLike"
                  data-blog-id={ blog.id }
                  onClick={ addLike }>

                  {t("BlogListItem.btnLike")}
                </button>
              </div>
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
}

export default BlogListItem
