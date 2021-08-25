import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { Q_ALL_GENRES_AND_BOOKS } from "./queries"


const Books = ({ showForm }) => {
  const [currentGenre, setCurrentGenre] = useState(null)
  const [getGenresAndBooks, getGenresAndBooksResult] =
    useLazyQuery(Q_ALL_GENRES_AND_BOOKS, {
      pollInterval: 2000
    })

  const [getGenresAndBooksCalled,
    setGetGenresAndBooksCalled] = useState(false)
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState(null)

  useEffect(() => {
    getGenresAndBooks({
      variables: {genre: currentGenre}
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGenre])

  useEffect(() => {
    if (getGenresAndBooksResult.data) {
      setGenres(getGenresAndBooksResult.data.allGenres)
      setBooks(getGenresAndBooksResult.data.allBooks)
    }
  }, [getGenresAndBooksResult])

  if (!showForm) {
    return null
  }

  if (!getGenresAndBooksCalled) {
    setGetGenresAndBooksCalled(true)
    getGenresAndBooks()
  }

  if (books) {
    const genreButtons = (
      <>
        <div style={{marginTop: "0.5em", marginBottom: "0.25em"}}>Genres:</div>
        <button onClick={()=>setCurrentGenre(null)}>All</button>
        {genres.map(g =>
          <button
            style={{marginLeft: "0.5em"}}
            onClick={()=>setCurrentGenre(g)}
            key={g}>{g}</button>
        )}
      </>
    )

    return (
      <div>
        <h2>books</h2>

        {currentGenre ? <div>in genre <b>{currentGenre}</b></div> : ""}

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
        {genres ? genreButtons : ""}
      </div>
    )
  }

  return <div>Loading...</div>
}

export default Books
