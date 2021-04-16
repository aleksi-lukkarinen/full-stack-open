import axios from "axios"
import * as conf from "../consts"

function simplified(result) {
  return result.then(response => response.data)
}

function getAll() {
  const result = axios.get(conf.SERVER_URL_PERSONS)
  return simplified(result)
}

function create(entryToAdd) {
  const result = axios.post(conf.SERVER_URL_PERSONS, entryToAdd)
  return simplified(result)
}

const PersonsService = {
  getAll: getAll,
  create: create,
}

export default PersonsService
