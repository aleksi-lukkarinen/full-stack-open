import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import AnecdoteService from "./services/anecdoteService"
import { initAnecdotes } from "./reducers/anecdoteReducer"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AnecdoteService.getAll()
        .then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />

      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App