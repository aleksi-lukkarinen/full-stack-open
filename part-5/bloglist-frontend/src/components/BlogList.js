import React from "react"

import PropTypes from "prop-types"

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

  blogs.sort(compareBlogs)

  const listElements = []
  for (let i=0; i<blogs.length; i++) {
    const b = blogs[Number(i)]
    const el = (
      <BlogListItem
        key={ b.id }
        blog={ b }
        blogs={ blogs }
        setBlogs={ setBlogs }
        currentUser={ currentUser }
        setInfoMessage={ setInfoMessage }
        setErrorMessage={ setErrorMessage } />
    )
    listElements.push(el)
  }

  return <>{listElements}</>
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  setBlogs: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setInfoMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default BlogList
