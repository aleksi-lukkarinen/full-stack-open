import React, { useState, useEffect } from "react"
import { M_LOGIN } from "./queries"
import { useMutation } from "@apollo/client"


const LoginForm = ({ showForm, applyLogin, notify }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, loginResult] = useMutation(M_LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    setUsername("")
    setPassword("")
    login({ variables: { username, password } })
  }

  useEffect(() => {
    if (loginResult.data) {
      applyLogin(loginResult.data.login.value)
    }
  }, [loginResult.data]) // eslint-disable-line

  if (!showForm) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            autoComplete="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
