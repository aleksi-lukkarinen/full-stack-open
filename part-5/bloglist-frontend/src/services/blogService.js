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
  const settings = {
    headers: {
      Authorization: authToken
    }
  }
  const result = axios.post(baseUrl, blogToInsert, settings)
  return simplified(result)
}

function likeBlog(blogToLike) {
  const url = `${baseUrl}/${blogToLike.id}`
  const dataToPut = {
    ...blogToLike,
    likes: blogToLike.likes + 1
  }
  const result = axios.put(url, dataToPut)
  return simplified(result)
}

const BlogService = {
  getAll: getAllBlogs,
  insert: insertBlog,
  like: likeBlog,
  setAuthToken,
}

export default BlogService
