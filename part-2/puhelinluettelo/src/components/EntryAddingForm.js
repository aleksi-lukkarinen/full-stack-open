import * as conf from "./consts"
import React, {useState} from 'react'
import axios from "axios"
import SectionHeader from "./SectionHeader"

const EntryAddingForm = ({title, entries, setEntries}) => {
  const [newName, setNewName] = useState(conf.STR_EMPTY)
  const [newPhoneNumber, setNewPhoneNumber] = useState(conf.STR_EMPTY)

  function addEntry(event) {
    event.preventDefault()

    let errMsg = undefined;
    const trimmedName = newName.trim()

    if (trimmedName.length < 1) {
      errMsg = conf.ERR_ADDING_EMPTY_NAME
    }
    else {
      const ucaseName = trimmedName.toUpperCase()
      const testIfNameExists = e => e.name.toUpperCase() === ucaseName
      const existingEntry = entries.find(testIfNameExists)

      if (existingEntry) {
        errMsg = conf.ERR_ADDING_DUP_ENTRY.replace(
          conf.TEMPLATE_MARK, existingEntry.name)
      }
    }

    if (errMsg) {
      alert(errMsg)
    }
    else {
      const entryToAdd = {
        name: trimmedName,
        phoneNumber: newPhoneNumber.trim()
      }

      axios
        .post(conf.SERVER_URL_PERSONS, entryToAdd)
        .then(response => {
          setEntries(entries.concat(response.data))
        })
    }

    clearFields()
  }

  function clearFields() {
    setNewName(conf.STR_EMPTY)
    setNewPhoneNumber(conf.STR_EMPTY)
  }

  const updateName = (event) =>
    setNewName(event.target.value)

  const updatePhoneNumber = (event) =>
    setNewPhoneNumber(event.target.value)

  return (
    <>
      <SectionHeader content={title} />
      <form onSubmit={addEntry}>
        <div>
          Name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          Number: <input value={newPhoneNumber} onChange={updatePhoneNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default EntryAddingForm
