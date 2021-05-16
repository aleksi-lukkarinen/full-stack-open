import React from "react"
import ReactDOM from "react-dom"

import { createStore } from "redux"

import reducer, { ACTION_TYPES } from "./reducer"



const store = createStore(reducer)

function createFeedbackHandlerFor(actionType) {
  return () => store.dispatch({ type: actionType })
}

const handleGood = createFeedbackHandlerFor(ACTION_TYPES.GOOD)
const handleOK = createFeedbackHandlerFor(ACTION_TYPES.OK)
const handleBad = createFeedbackHandlerFor(ACTION_TYPES.BAD)

function handleResetStats() {
  store.dispatch({ type: ACTION_TYPES.ZERO })
}

const App = () => {
  return (
    <div>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleOK}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <button onClick={handleResetStats}>Reset Statistics</button>

      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)
