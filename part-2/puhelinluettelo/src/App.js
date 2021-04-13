import React, { useState } from 'react'
import NumberListLine from './components/NumberListLine'

const initialEntryList = [
  {name: "Arto Hellas", phoneNumber: "+358 000 123 4567"},
  {name: "Ada Lovelace", phoneNumber: "39-44-5323523" },
  {name: "Bart Simpson", phoneNumber: "SPRINGVILLE-3599 2863" },
  {name: "Dan Abramov", phoneNumber: "12-43-234345" },
  {name: "Darth Vader", phoneNumber: "DEATHSTAR-9911 9119" },
  {name: "James T. Kirk", phoneNumber: "ENTERPRISE-000 0001" },
  {name: "Lisa Simpson", phoneNumber: "SPRINGVILLE-1291 5595" },
  {name: "Mary Poppendieck", phoneNumber: "39-23-6423122" },
  {name: "Scrooge McDuck", phoneNumber: "DUCKBURG-9588 2538" },
]
const TEMPLATE_MARK = "{}"
const STR_EMPTY = ""

const App = () => {
  const config = {
    errAddingEmptyName: "An empty name cannot be added to the phonebook.",
    errAddingDuplicateEntry: "A person with name {} has already been added to the phonebook; another one cannot be added.",
  }
  const [entries, setEntries] = useState(initialEntryList)
  const [newName, setNewName] = useState(STR_EMPTY)
  const [newPhoneNumber, setNewPhoneNumber] = useState(STR_EMPTY)
  const [nameFilter, setNameFilter] = useState({
    text: STR_EMPTY,
    filter: STR_EMPTY,
  })

  const addEntry = (event) => {
    event.preventDefault()

    let errMsg = undefined;
    const trimmedName = newName.trim()

    if (trimmedName.length < 1) {
      errMsg = config.errAddingEmptyName
    }
    else {
      const ucaseName = trimmedName.toUpperCase()
      const testIfNameExists = e => e.name.toUpperCase() === ucaseName
      const existingEntry = entries.find(testIfNameExists)

      if (existingEntry) {
        errMsg = config.errAddingDuplicateEntry.replace(
          TEMPLATE_MARK, existingEntry.name)
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

      setEntries(entries.concat(entryToAdd))
    }

    setNewName(STR_EMPTY)
    setNewPhoneNumber(STR_EMPTY)
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updatePhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const updateNameFilter = (event) => {
    const newState = {text: event.target.value}
    newState.filter = newState.text.trim().toUpperCase()

    setNameFilter(newState)
  }

  const entryFilterFunc = e =>
    e.name.toUpperCase().includes(nameFilter.filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a New Entry</h3>
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
      <h3>Numbers</h3>
      <div>Filter with: <input value={nameFilter.text} onChange={updateNameFilter} /></div>
      <div>
        {entries.filter(entryFilterFunc)
            .map(e => <NumberListLine entry={e} key={e.name} />)}
      </div>
    </div>
  )

}

export default App
