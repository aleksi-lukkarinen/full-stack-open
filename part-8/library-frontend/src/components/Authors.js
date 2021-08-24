import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Select from "react-select"
import { M_EDIT_AUTHOR, Q_ALL_AUTHORS } from "./queries"


const Authors = ({ showForm, isLoggedIn, notify }) => {
  const [authorName, setAuthorName] = useState(null)
  const [authorBirthYear, setAuthorBirthYear] = useState("")

  const allAuthorsResult = useQuery(Q_ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [editAuthor] = useMutation(M_EDIT_AUTHOR, {
    onError: (error) => {
      const msg = error.networkError
        ? error.networkError.result.errors[0].message
        : error.graphQLErrors[0].message

      notify(msg)
    }
  })

  if (!showForm) {
    return null
  }

  if (allAuthorsResult.loading) {
    return <div>Loading...</div>
  }

  // Error handling for the query is missing

  const allAuthors = Array.isArray(allAuthorsResult.data.allAuthors)
    ? allAuthorsResult.data.allAuthors : []

  const authorDropdownOptions = allAuthors.map(a =>
    {return {value: a.name, label: a.name}}
  )

  const submitBirthYear = async (event) => {
    event.preventDefault()

    const author = authorName
            ? authorName.value
            : authorDropdownOptions[0].value

    editAuthor({
      variables: {
        name: author,
        setBornTo: Number.parseInt(authorBirthYear)}
    })

    setAuthorBirthYear("")
  }

  const showUpdatingForm = isLoggedIn && allAuthors.length > 0

  const updatingForm = (
    <>
      <h3>set birthyear</h3>
      <form onSubmit={submitBirthYear}>
        <div>
          name
          <Select
            defaultValue={authorDropdownOptions[0]}
            onChange={setAuthorName}
            options={authorDropdownOptions} />
        </div>
        <div>
          born
          <input
            value={authorBirthYear}
            onChange={({ target }) => setAuthorBirthYear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {showUpdatingForm ? updatingForm : ""}
    </div>
  )
}

export default Authors
