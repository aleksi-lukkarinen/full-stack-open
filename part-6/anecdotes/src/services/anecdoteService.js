import axios from "axios"


const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const anecdoteToPost = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteToPost)
  console.log("RESPONSE: ", response.data)
  return response.data
}

const AnecdoteService = {
  getAll,
  createNew,
}

export default AnecdoteService
