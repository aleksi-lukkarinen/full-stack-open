import React, {useState} from "react"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import Notification from "./Notification"


const LoginView = ({setCurrentUser, viewTitle}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  async function processLogin(event) {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username, password
      })

      const jsonUserData = JSON.stringify(loggedInUser)
      window.localStorage.setItem(
        "loggedBlogListUser", jsonUserData)

      setCurrentUser(loggedInUser)
      blogService.setAuthToken(loggedInUser.token)
    }
    catch (error) {
      setErrorMessage("Invalid credentials.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="contentContainer">
      <SectionHeader
        content={viewTitle}
        isFirst={true} />

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
}


export default LoginView
