import React, { useState } from 'react'
import NumberListLine from './components/NumberListLine'

const App = () => {
  const [entries, setEntries] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    const entryToAdd = {
      name: newName,
    }

    setEntries(entries.concat(entryToAdd))
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
          name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {entries.map(p => <NumberListLine entry={p} key={p.name} />)}
    </div>
  )

}

export default App
