import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import { ThemeProvider } from "@material-ui/core/styles"

import "./i18n"
import App from "./App"
import defaultTheme from "./themes/defaultTheme"
import "./index.css"


const appBase = (
  <ThemeProvider theme={ defaultTheme }>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
)

const root = document.getElementById("root")

ReactDOM.render(appBase, root)
