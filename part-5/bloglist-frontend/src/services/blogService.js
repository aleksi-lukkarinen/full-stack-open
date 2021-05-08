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

function deleteBlog(blogToDelete) {
  const settings = {
    headers: {
      Authorization: authToken
    }
  }
  const url = `${baseUrl}/${blogToDelete.id}`
  const result = axios.delete(url, settings)
  return simplified(result)
}

const BlogService = {
  getAll: getAllBlogs,
  insert: insertBlog,
  like: likeBlog,
  delete: deleteBlog,
  setAuthToken,
}

export default BlogService
