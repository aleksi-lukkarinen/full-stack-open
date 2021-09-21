import React from "react"

import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { TextField } from "@material-ui/core"

import {
  setErrorNotification,
  clearErrorNotification,
} from "../reducers/notificationReducer"
import { setCurrentUser } from "../reducers/currentUserReducer"
import { useField } from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import SubmitButton from "./SubmitButton"



const LoginView = () => {
  const dispatch = useDispatch()
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

      dispatch(setCurrentUser(loggedInUser))
      blogService.setAuthToken(loggedInUser.token)
    }
    catch (error) {
      dispatch(setErrorNotification(t("LoginForm.errInvalidCreds")))
      setTimeout(() => {
        dispatch(clearErrorNotification())
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

export default LoginView
