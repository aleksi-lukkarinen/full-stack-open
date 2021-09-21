import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { ThemeProvider } from "@material-ui/core/styles"

import notificationReducer from "./reducers/notificationReducer"
import currentUserReducer from "./reducers/currentUserReducer"
import "./i18n"
import App from "./App"
import defaultTheme from "./themes/defaultTheme"
import "./index.css"



const reducer = combineReducers({
  notifications: notificationReducer,
  currentUser: currentUserReducer,
})

const store = createStore(reducer)

const appBase = (
  <ThemeProvider theme={ defaultTheme }>
    <Router>
      <Provider store={ store }>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>
)

const root = document.getElementById("root")

ReactDOM.render(appBase, root)
