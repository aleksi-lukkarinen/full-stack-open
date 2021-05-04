import PropTypes from "prop-types"

import BlogListItem from "./BlogListItem"


const BlogList = ({blogs}) => {
  return (
    <>
      {blogs.map(blog => <BlogListItem key={blog.id} blog={blog} />)}
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
}

export default BlogList
