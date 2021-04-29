import React, { useState, useEffect } from "react"
import loginService from "./services/loginService"
import blogService from "./services/blogService"
import Notification from "./components/Notification"
import BlogListItem from "./components/Blog"


const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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

  async function processLogin(event) {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        "loggedBlogListUser",
        JSON.stringify(loggedInUser))

      setCurrentUser(loggedInUser)
      setUsername("")
      setPassword("")
    }
    catch (error) {
      setErrorMessage("Invalid credentials.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  async function processLogout(event) {
    window.localStorage.removeItem("loggedBlogListUser")
    window.location.reload()
  }

  const loginForm = () => (
    <div>
      <h2>Log in to BlogList</h2>
      <form onSubmit={processLogin}>

        <Notification
          content={errorMessage}
          baseClass={"notificationBox"}
          messageVisibleClass={"errorVisible"} />

        <div>
          <span>Username</span>
            <input type="text" value={username} name="Username"
              autoComplete="username"
              onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <span>Password</span>
            <input type="password" value={password} name="Password"
              autoComplete="current-password"
              onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{currentUser.name} logged in.
        <button onClick={() => processLogout()}>Log out</button></p>
      {blogs.map(blog =>
        <BlogListItem key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <>
      { currentUser === null ? loginForm() : blogList() }
    </>
  )
}


export default App
