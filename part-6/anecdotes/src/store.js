import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"


const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
})

const Store = createStore(
  rootReducer,
  composeWithDevTools()
)

export default Store
