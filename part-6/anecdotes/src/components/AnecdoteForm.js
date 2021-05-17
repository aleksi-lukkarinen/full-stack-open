import React from "react"
import { useDispatch } from "react-redux"

import AnecdoteService from "../services/anecdoteService"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddition = async event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ""

    const createdAnecdote =
      await AnecdoteService.createNew(content)

    dispatch(addAnecdote(createdAnecdote))
    dispatch(addNotification(`Added anecdote "${content}".`))
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
