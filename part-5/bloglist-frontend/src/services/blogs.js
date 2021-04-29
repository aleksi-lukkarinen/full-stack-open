import axios from "axios"
const baseUrl = "/api/blogs"


let authToken = null

function setAuthToken(tokenToSet) {
  authToken = `Bearer ${tokenToSet}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const exports = {
  getAll,
  setAuthToken,
}

export default exports
