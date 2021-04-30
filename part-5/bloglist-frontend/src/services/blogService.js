import axios from "axios"

const baseUrl = "/api/blogs"
let authToken = null


function simplified(result) {
  return result.then(response => response.data)
}

function setAuthToken(tokenToSet) {
  authToken = `Bearer ${tokenToSet}`
}

function getAllBlogs() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

function insertBlog(blogToInsert) {
  const config = {
    headers: {
      Authorization: authToken
    }
  }
  const result = axios.post(baseUrl, blogToInsert, config)
  return simplified(result)
}

const BlogService = {
  getAll: getAllBlogs,
  insert: insertBlog,
  setAuthToken,
}

export default BlogService
