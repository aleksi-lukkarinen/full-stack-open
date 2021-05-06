import React from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import { useField } from "../hooks"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import SectionHeader from "./SectionHeader"
import SimpleForm from "./SimpleForm"
import SimpleFormRow from "./SimpleFormRow"


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

      <SimpleForm submitTitle={ t("LoginForm.cmdLogin") } onSubmit={ processLogin }>
        <SimpleFormRow>
          <label htmlFor={ username.id }>{t("LoginForm.lblUsername")}</label>
          <input
            { ...username }
            autoFocus
            autoComplete="username" />
        </SimpleFormRow>
        <SimpleFormRow>
          <label htmlFor={ password.id }>{t("LoginForm.lblPassword")}</label>
          <input
            { ...password }
            autoComplete="current-password" />
        </SimpleFormRow>
      </SimpleForm>
    </>
  )
}

LoginView.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginView
