import axios from "axios"
import * as conf from "../consts"

function simplified(result) {
  return result.then(response => response.data)
}

function getAllEntries() {
  const result = axios.get(conf.SERVER_URL_PERSONS)
  return simplified(result)
}

function createEntry(entryToAdd) {
  const result = axios.post(conf.SERVER_URL_PERSONS, entryToAdd)
  return simplified(result)
}

function deleteEntry(idToDelete) {
  const url = `${conf.SERVER_URL_PERSONS}/${idToDelete}`
  const result = axios.delete(url)
  return result
}

const PersonsService = {
  getAll: getAllEntries,
  create: createEntry,
  delete: deleteEntry,
}

export default PersonsService
