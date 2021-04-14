import * as conf from "./components/consts"
import axios from "axios"
import React, { useState, useEffect } from "react"
import PageHeader from "./components/PageHeader"
import EntryList from "./components/EntryList"
import EntryAddingForm from "./components/EntryAddingForm"

const App = () => {
  const [entries, setEntries] = useState([])

  const loadDB = () => {
    axios
      .get(conf.SERVER_URL)
      .then(response => setEntries(response.data))
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
        entries={entries} />
    </>
  )

}

export default App
