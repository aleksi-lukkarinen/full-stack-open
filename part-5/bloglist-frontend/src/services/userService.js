import axios from "axios"

const baseUrl = "/api/users"


function getAllUsers() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const BlogService = {
  getAll: getAllUsers,
}

export default BlogService
