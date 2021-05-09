import React, { useState } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import BrToHide from "./BrToHide"


const BlogListItem = ({
  blog,
  handleDetailVisibilityToggling,
  handleAddLike,
  deleteButtonIsVisible, handleDeleteBlog }) => {

  const { t } = useTranslation()
  const [blogDetailsAreVisible, setDetailVisibility] = useState(false)

  const visibilityButtonTitleKey =
    blogDetailsAreVisible ? "hide" : "show"
  const visibilityButtonTitle =
    t(`BlogListItem.btnDetailVisibility.${visibilityButtonTitleKey}`)

  const showAuthor = blog.author && blog.author.length > 0

  return (
    <>
      <div className="blogListItem">
        <div className="pnlButtons">
          <button
            type="button"
            className="btnDetailVisibility"
            onClick={ handleDetailVisibilityToggling(blogDetailsAreVisible, setDetailVisibility) }>

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
                  onClick={ handleAddLike }>

                  {t("BlogListItem.btnLike")}
                </button>
              </div>
              {deleteButtonIsVisible &&
                <div className="blogDeletion">
                  <button
                    type="button"
                    className="btnDelete"
                    onClick={ handleDeleteBlog }>

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
  handleDetailVisibilityToggling: PropTypes.func.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  deleteButtonIsVisible: PropTypes.bool.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}

export default BlogListItem
