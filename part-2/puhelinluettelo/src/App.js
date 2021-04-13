import * as conf from "./components/consts"
import React, { useState } from "react"
import PageHeader from "./components/PageHeader"
import EntryList from "./components/EntryList"
import EntryAddingForm from "./components/EntryAddingForm"

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

const App = () => {
  const [entries, setEntries] = useState(initialEntryList)

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
