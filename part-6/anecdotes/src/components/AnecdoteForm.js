import React from "react"
import { useDispatch } from "react-redux"

import { newAnecdote } from "../reducers/anecdoteReducer"



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddition = event => {
    event.preventDefault()

    const content = event.target.content.value
    dispatch(newAnecdote(content))
  }

  return (
    <>
      <h3>Create New</h3>
      <form onSubmit={handleAddition}>
        <div><input name="content" /></div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
