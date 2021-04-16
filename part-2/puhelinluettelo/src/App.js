import * as conf from "./conf"
import React, { useState, useEffect } from "react"
import PageHeader from "./components/PageHeader"
import EntryList from "./components/EntryList"
import EntryAddingForm from "./components/EntryAddingForm"
import PersonsService from "./services/persons"

const App = () => {
  const [entries, setEntries] = useState([])

  const loadDB = () => {
    PersonsService.getAll().then(data => setEntries(data))
  }
  useEffect(loadDB, [])

  return (
    <>
      <PageHeader content={conf.APP_TITLE} />

      <EntryAddingForm
        title={conf.SECTION_TITLE_NEW_ENTRY}
        entries={entries}
        setEntries={setEntries} />

      <EntryList
        title={conf.SECTION_TITLE_SAVED_ENTRIES}
        entries={entries}
        setEntries={setEntries} />
    </>
  )

}

export default App
