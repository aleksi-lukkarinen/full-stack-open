import React from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import {
  Button,
  TextField,
} from "@material-ui/core"


import { useField } from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"


const LoginView = ({
  setCurrentUser,
  setErrorMessage }) => {

  const { t } = useTranslation()
  const { reset:resetUsername, ...username } =
    useField("txtUsername", "text")
  const { reset:resetPassword, ...password } =
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
      setErrorMessage(t("LoginForm.errInvalidCreds"))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      username.ref.current.focus()
    }
  }

  return (
    <>
      <SectionHeader
        content={ t("LoginForm.title") }
        thisIsFirstHeader={ true } />

      <form onSubmit={ processLogin }>
        <div>
          <TextField
            { ...username }
            variant="filled"
            size="small"
            label={ t("Forms.Required") }
            placeholder={ t("LoginForm.lblUsername") }
            autoFocus
            autoComplete="username"
            InputLabelProps={ { shrink: true } } />
        </div>
        <div>
          <TextField
            { ...password }
            variant="filled"
            size="small"
            style={ { marginTop: "0.5em" } }
            label={ t("Forms.Required") }
            placeholder={ t("LoginForm.lblPassword") }
            autoComplete="current-password"
            InputLabelProps={ { shrink: true } } />
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            style={ { marginTop: "1em" } }
            color="primary"
            type="submit">

            {t("LoginForm.cmdLogin")}
          </Button>
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
