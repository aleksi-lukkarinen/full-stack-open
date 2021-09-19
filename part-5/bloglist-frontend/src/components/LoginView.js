import React from "react"

import { useTranslation } from "react-i18next"
import { TextField } from "@material-ui/core"
import PropTypes from "prop-types"

import { useField } from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import SubmitButton from "./SubmitButton"


const LoginView = ({
  setCurrentUser,
  setErrorMessage }) => {

  const { t } = useTranslation()
  const { reset:resetUsername, ...username } =
    useField("txtUsername", "text")
  const { reset:resetPassword, ...password } =
    useField("txtPassword", "password")

  async function handleLogin(event) {
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
      setErrorMessage(t("LoginForm.errInvalidCreds"))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      username.inputRef.current.focus()
    }
  }

  return (
    <>
      <SectionHeader
        variant="h1"
        content={ t("LoginForm.title") }
        thisIsFirstHeader={ true } />

      <form id="loginForm" onSubmit={ handleLogin }>
        <div>
          <TextField
            { ...username }
            label={ t("Forms.Required") }
            placeholder={ t("LoginForm.lblUsername") }
            autoFocus
            autoComplete="username" />
        </div>
        <div>
          <TextField
            { ...password }
            style={ { marginTop: "0.5em" } }
            label={ t("Forms.Required") }
            placeholder={ t("LoginForm.lblPassword") }
            autoComplete="current-password" />
        </div>
        <div>
          <SubmitButton
            id="cmdLogin"
            title={ t("LoginForm.cmdLogin") }
            style={ { marginTop: "1em" } } />
        </div>
      </form>
    </>
  )
}

LoginView.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginView
