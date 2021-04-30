import React, {useRef, useState} from "react"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"


const LoginView = ({
  viewTitle,
  setCurrentUser,
  setErrorMessage}) => {

  const inputUsername = useRef(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
      inputUsername.current.focus()
    }
  }

  return (
    <div className="contentContainer">
      <SectionHeader
        content={viewTitle}
        isFirst={true} />

      <form className="loginForm" onSubmit={processLogin}>
        <div className="row">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            autoFocus
            autoComplete="username"
            ref={inputUsername}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className="row">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div className="row">
          <div className="cell" />
          <div className="cell">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  )
}


export default LoginView
