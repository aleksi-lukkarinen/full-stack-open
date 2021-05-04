import React, { useState, useEffect } from "react"

import blogService from "./services/blogService"
import LoginView from "./components/LoginView"
import BlogListView from "./components/BlogListView"
import SiteHeader from "./components/SiteHeader"
import Notification from "./components/Notification"
import ContentContainer from "./components/ContentContainer"


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
    <>
      <SiteHeader
        currentUser={currentUser}
        setCurrentUser={setCurrentUser} />

      <ContentContainer>
        <Notification
          content={errorMessage}
          baseClass={"notificationBox"}
          messageVisibleClass={"errorVisible"} />

        <Notification
          content={infoMessage}
          baseClass={"notificationBox"}
          messageVisibleClass={"infoVisible"} />

        { currentUser === null
          ? <LoginView
              setCurrentUser={setCurrentUser}
              setErrorMessage={setErrorMessage} />
          : <BlogListView
              setInfoMessage={setInfoMessage}
              setErrorMessage={setErrorMessage} />
        }
      </ContentContainer>
    </>
  )
}


export default App
