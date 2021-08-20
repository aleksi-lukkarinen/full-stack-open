import { gql } from "@apollo/client"


export const Q_ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const Q_ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
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
      author
    }
  }
`