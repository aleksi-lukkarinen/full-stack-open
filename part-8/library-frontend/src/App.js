import React, { useState } from 'react'

import { useApolloClient } from '@apollo/client'

import { Q_ME } from "./components/queries"
import LoginForm from "./components/LoginForm"
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from "./components/Notify"
import Recommend from './components/Recommend'


const App = () => {
  const client = useApolloClient()

  const [token, setToken] =
      useState(localStorage.getItem('Library-user-token'))

  const [page, setPage] = useState('authors')

  const [errorMessage, setErrorMessage] = useState(null)

  const setDefaultPage = () => {
    setPage("authors")
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  function applyLogin(token) {
    setToken(token)
    localStorage.setItem("Library-user-token", token)
    client.refetchQueries({
      include: [ Q_ME ]
    })
    setDefaultPage()
  }

  function logout() {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    if (page === "add" || page === "recommend") {
      setDefaultPage()
    }
  }

  const loginButton =
          <button onClick={() => setPage('login')}>login</button>

  const logoutButton =
          <button onClick={() => logout()}>logout</button>

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : ""}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : ""}
        {token ? logoutButton : loginButton}
      </div>

      <Authors
        showForm={page === 'authors'}
        isLoggedIn={token !== null}
        notify={notify}
      />

      <Books
        showForm={page === 'books'}
        notify={notify}
      />

      <NewBook
        showForm={page === 'add'}
        notify={notify}
      />

      <Recommend showForm={page === 'recommend'} />

      <LoginForm
        showForm={page === 'login'}
        applyLogin={applyLogin}
        notify={notify} />
    </div>
  )
}

export default App
