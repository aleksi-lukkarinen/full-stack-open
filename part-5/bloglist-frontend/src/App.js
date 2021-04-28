import React, { useState, useEffect } from "react"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Blog from "./components/Blog"


const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const processLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (error) {
      setErrorMessage("Invalid credentials.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)    }
  }

  if (user === null) {
    return (
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
                onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <span>Password</span>
              <input type="password" value={password} name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
