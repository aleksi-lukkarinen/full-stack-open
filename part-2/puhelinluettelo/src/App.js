import React, { useState } from 'react'
import NumberListLine from './components/NumberListLine'

const App = () => {
  const config = {
    errAddingEmptyName: "An empty name cannot be added to the phonebook.",
    errAddingDuplicateEntry: "A person with name {} has already been added to the phonebook; another one cannot be added."
  }
  const [entries, setEntries] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState("")

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
                    "{}", existingEntry.name)
      }
    }

    if (errMsg) {
      alert(errMsg)
    }
    else {
      const entryToAdd = {
        name: trimmedName,
      }

      setEntries(entries.concat(entryToAdd))
    }

    setNewName("")
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          Name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {entries.map(p => <NumberListLine entry={p} key={p.name} />)}
    </div>
  )

}

export default App
