import React, { useState, useEffect } from "react"

import Container from "@material-ui/core/Container"

import blogService from "./services/blogService"
import LoginView from "./components/LoginView"
import BlogListView from "./components/BlogListView"
import SiteHeader from "./components/SiteHeader"
import Notification from "./components/Notification"


const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem("loggedBlogListUser")

    if (loggedUserJSON === null || typeof(loggedUserJSON) !== "string") {
      window.localStorage.removeItem("loggedBlogListUser")
      return
    }

    const user = JSON.parse(loggedUserJSON)
    setCurrentUser(user)
    blogService.setAuthToken(user.token)
  }, [])

  return (
    <Container maxWidth="sm">
      <SiteHeader
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />

      <Notification
        content={ errorMessage }
        severity="error" />

      <Notification
        content={ infoMessage }
        severity="success" />

      { currentUser === null
        ? <LoginView
            setCurrentUser={ setCurrentUser }
            setErrorMessage={ setErrorMessage } />
        : <BlogListView
            setInfoMessage={ setInfoMessage }
            setErrorMessage={ setErrorMessage }
            currentUser={ currentUser } />
      }
    </Container>
  )
}


export default App
