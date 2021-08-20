import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Select from "react-select"
import { M_EDIT_AUTHOR, Q_ALL_AUTHORS } from "./queries"
import Notify from "./Notify"


const Authors = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [authorName, setAuthorName] = useState(null)
  const [authorBirthYear, setAuthorBirthYear] = useState("")

  const result = useQuery(Q_ALL_AUTHORS, {
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

  const submitBirthYear = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: authorName.value,
        setBornTo: Number.parseInt(authorBirthYear)}
    })

    setAuthorBirthYear("")
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const authorOptions = authors.map(a =>
    {return {value: a.name, label: a.name}}
  )

  const updatingForm = (
    <>
      <h3>set birthyear</h3>
      <form onSubmit={submitBirthYear}>
        <div>
          name
          <Select
            defaultValue={authorOptions[0]}
            onChange={setAuthorName}
            options={authorOptions} />
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
      <Notify errorMessage={errorMessage} />

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
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {Array.isArray(authors) && authors.length > 0 ? updatingForm : ""}
    </div>
  )
}

export default Authors
