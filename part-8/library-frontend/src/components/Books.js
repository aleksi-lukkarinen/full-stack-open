import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { Q_ALL_BOOKS } from "./queries"


const Books = (props) => {
  const [getBooks, getBooksResult] = useLazyQuery(Q_ALL_BOOKS, {
    pollInterval: 2000
  })

  const [getBooksCalled, setGetBooksCalled] = useState(false)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (getBooksResult.data) {
      setBooks(getBooksResult.data.allBooks)
    }
  }, [getBooksResult])

  if (!props.show) {
    return null
  }

  if (!getBooksCalled) {
    setGetBooksCalled(true)
    getBooks()
  }

  if (books) {
    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return <div>Loading...</div>
}

export default Books
