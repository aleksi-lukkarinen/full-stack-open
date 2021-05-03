import React from "react"
import {useField} from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"


const LoginView = ({
  viewTitle,
  setCurrentUser,
  setErrorMessage}) => {

  const {reset:resetUsername, ...username} =
    useField("txtUsername", "text")
  const {reset:resetPassword, ...password} =
    useField("txtPassword", "text")

  async function processLogin(event) {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username: username.value,
        password: password.value,
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
      username.ref.current.focus()
    }
  }

  return (
    <>
      <SectionHeader
        content={viewTitle}
        isFirst={true} />

      <form className="loginForm" onSubmit={processLogin}>
        <div className="row">
          <label htmlFor={username.id}>Username</label>
          <input
            {...username}
            autoFocus
            autoComplete="username" />
        </div>
        <div className="row">
          <label htmlFor={password.id}>Password</label>
          <input
            {...password}
            autoComplete="current-password" />
        </div>
        <div className="row">
          <div className="cell" />
          <div className="cell">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </>
  )
}


export default LoginView
