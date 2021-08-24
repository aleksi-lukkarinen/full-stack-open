import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { Q_ALL_BOOKS_OF_GENRE, Q_ME } from "./queries"


const Recommend = ({ showForm }) => {
  const getUserResult = useQuery(Q_ME, {
    fetchPolicy: "no-cache",
  })
  console.log("getUserResult.data ", getUserResult.data)
  const favGenre =
    getUserResult.data
      ? (getUserResult.data.me
          ? (typeof(getUserResult.data.me.favoriteGenre) === "string"
              ? getUserResult.data.me.favoriteGenre
              : undefined)
          : undefined)
      : undefined
  const getRecommendationsResult =
    useQuery(Q_ALL_BOOKS_OF_GENRE, {
      variables: { genre: favGenre},
      skip: typeof(favGenre) !== "string",
      pollInterval: 2000
    })

  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (getRecommendationsResult.data) {
      setBooks(getRecommendationsResult.data.allBooks)
    }
  }, [getRecommendationsResult])

  if (!showForm) {
    return null
  }

  if (books) {
    return (
      <div>
        <h2>recommendations</h2>
        <div>books in your favorite genre "{favGenre}":</div>
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

export default Recommend
