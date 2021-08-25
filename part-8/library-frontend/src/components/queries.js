import { gql } from "@apollo/client"


export const M_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const Q_ME = gql`query{me{username, favoriteGenre}}`

export const Q_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const Q_ALL_GENRES_AND_BOOKS = gql`
  query($genre: String) {
    allGenres
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export const Q_ALL_BOOKS_OF_GENRE = gql`
  query($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export const M_CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]) {

    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      }
    }
  }
`

export const M_EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!,
    $setBornTo: Int!) {

    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name,
      born
    }
  }
`
