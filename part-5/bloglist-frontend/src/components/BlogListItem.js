import React, { useState } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"


const BlogListItem = ({ blog }) => {
  const { t } = useTranslation()
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

  return (
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
        <span className="blogTitle">{blog.title}</span>
        {showAuthor &&
          <span className="blogAuthor">{blog.author}</span>
        }
      </div>
      {blogDetailsAreVisible &&
        <>
          <div className="blogUrl">{blog.url}</div>
          <div className="footer">
            <span className="adder">{blog.user.name}</span>
            <span className="blogLikes">
              {t("BlogListItem.likes", { "count": blog.likes })}
              <button type="button" className="btnLike">
                {t("BlogListItem.btnLike")}
              </button>
            </span>
          </div>
        </>
      }
    </div>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem
