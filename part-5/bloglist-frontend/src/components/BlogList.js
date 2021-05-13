import React from "react"

import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import BlogService from "../services/blogService"
import BlogListItem from "./BlogListItem"


function compareBlogs(a, b) {
  if (a.likes > b.likes) return -1
  if (a.likes < b.likes) return 1

  const lcTitleA = a.title.toLowerCase()
  const lcTitleB = b.title.toLowerCase()
  if (lcTitleA < lcTitleB) return -1
  if (lcTitleA > lcTitleB) return 1

  const authorA = a.author.toLowerCase()
  const authorB = b.author.toLowerCase()
  if (authorA < authorB) return -1
  if (authorA > authorB) return 1

  if (a.title < b.title) return -1
  if (a.title > b.title) return 1

  return 0
}

const BlogList = ({
  blogs, setBlogs,
  currentUser,
  setInfoMessage, setErrorMessage }) => {

  const { t } = useTranslation()

  const handleAddLike = blog => event => {
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

  const handleDeleteBlog = blog => event => {
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

  const handleDetailVisibilityToggling =
    (blogDetailsAreVisible, setDetailVisibility) =>
      event => {
        event.preventDefault()
        setDetailVisibility(!blogDetailsAreVisible)
      }


  blogs.sort(compareBlogs)

  const listElements = []
  const currentUserId = currentUser.id.toString()
  for (let i=0; i<blogs.length; i++) {
    const b = blogs[Number(i)]
    const showDelete = currentUser &&
            (b.user.id.toString() === currentUserId)

    const element = (
      <BlogListItem
        key={ b.id }
        blog={ b }
        handleDetailVisibilityToggling={ handleDetailVisibilityToggling }
        handleAddLike={ handleAddLike(b) }
        deleteButtonIsVisible={ showDelete }
        handleDeleteBlog={ handleDeleteBlog(b) } />
    )
    listElements.push(element)
  }

  return (
    <div className="blogListContainer">
      {listElements}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  setBlogs: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default BlogList
