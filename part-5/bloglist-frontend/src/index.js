import React from "react"
import ReactDOM from "react-dom"
import "./i18n"
import App from "./App"
import "./index.css"


const appBase = (
  <App />
)

const root = document.getElementById("root")

ReactDOM.render(appBase, root)
