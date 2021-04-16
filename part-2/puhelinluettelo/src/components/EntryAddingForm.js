import * as conf from "../conf"
import React, {useState} from 'react'
import SectionHeader from "./SectionHeader"
import PersonsService from "../services/persons"

const EntryAddingForm = ({title, entries, setEntries}) => {
  const [newName, setNewName] = useState(conf.STR_EMPTY)
  const [newPhoneNumber, setNewPhoneNumber] = useState(conf.STR_EMPTY)

  function addEntry(event) {
    event.preventDefault()

    const trimmedName = newName.trim()
    if (trimmedName.length < 1) {
      const errMsg = conf.ERR_ADDING_EMPTY_NAME
      alert(errMsg)
    }
    else {
      const ucaseName = trimmedName.toUpperCase()
      const testIfNameExists = e => e.name.toUpperCase() === ucaseName

      const trimmedPhoneNumber = newPhoneNumber.trim()

      const existingEntry = entries.find(testIfNameExists)
      if (existingEntry) {
        const msg = conf.MSG_DUP_ENTRY_UPDATE.replace(
          conf.TEMPLATE_MARK, existingEntry.name)
        const userAgrees = window.confirm(msg)
        if (userAgrees) {
          const entryToUpdate = {
            ...existingEntry,
            phoneNumber: trimmedPhoneNumber,
          }
          PersonsService
            .update(entryToUpdate)
            .then(data => {
              const newEntries = entries.map(e =>
                      e.id !== entryToUpdate.id ? e : data)
              setEntries(newEntries)
            })
        }
      }
      else {
        const entryToAdd = {
          name: trimmedName,
          phoneNumber: trimmedPhoneNumber,
        }

        PersonsService
          .create(entryToAdd)
          .then(data => setEntries(entries.concat(data)))
      }
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
