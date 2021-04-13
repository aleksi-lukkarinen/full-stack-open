import * as conf from "./consts"
import React, { useState } from "react"
import SectionHeader from "./SectionHeader"
import NumberListLine from "./NumberListLine"

const initialFilterState = {
  text: conf.STR_EMPTY,
  filter: conf.STR_EMPTY,
}

const EntryList = ({title, entries}) => {
  const [nameFilter, setNameFilter] = useState(initialFilterState)

  function updateNameFilter(event) {
    const t = event.target.value
    const newState = {
      text: t,
      filter: t.trim().toUpperCase()
    }

    setNameFilter(newState)
  }

  const entryFilterFunc = e =>
    e.name.toUpperCase().includes(nameFilter.filter)

  return (
    <>
      <SectionHeader content={title} />
      <div>Filter with: <input value={nameFilter.text} onChange={updateNameFilter} /></div>
      {entries.filter(entryFilterFunc)
          .map(e => <NumberListLine entry={e} key={e.name} />)}
    </>
  )
}

export default EntryList
