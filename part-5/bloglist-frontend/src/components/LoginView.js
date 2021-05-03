import React from "react"
import {useField} from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import SubmitButton from "./SubmitButton"
import SimpleForm from "./SimpleForm"
import SimpleFormRow from "./SimpleFormRow"
import SimpleFormCell from "./SimpleFormCell"


const LoginView = ({
  viewTitle,
  setCurrentUser,
  setErrorMessage}) => {

  const {reset:resetUsername, ...username} =
    useField("txtUsername", "text")
  const {reset:resetPassword, ...password} =
    useField("txtPassword", "password")

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

      <SimpleForm onSubmit={processLogin}>
        <SimpleFormRow>
          <label htmlFor={username.id}>Username</label>
          <input
            {...username}
            autoFocus
            autoComplete="username" />
        </SimpleFormRow>
        <SimpleFormRow>
          <label htmlFor={password.id}>Password</label>
          <input
            {...password}
            autoComplete="current-password" />
        </SimpleFormRow>
        <SimpleFormRow>
          <SimpleFormCell />
          <SimpleFormCell>
            <SubmitButton title="Login" />
          </SimpleFormCell>
        </SimpleFormRow>
      </SimpleForm>
    </>
  )
}


export default LoginView
