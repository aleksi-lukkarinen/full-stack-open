import React, { useState, useEffect } from "react"
import blogService from "./services/blogService"
import LoginView from "./components/LoginView"
import BlogListView from "./components/BlogListView"
import SiteHeader from "./components/SiteHeader"


const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

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

      { currentUser === null
        ? <LoginView setCurrentUser={setCurrentUser}>
            Log in to BlogList
          </LoginView>
        : <BlogListView>Blogs</BlogListView>
      }
    </>
  )
}


export default App
