import React from "react"
import { connect } from "react-redux"

import { addAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"



const AnecdoteForm = ({ addAnecdote, addNotification }) => {
  const handleAddition = async event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ""

    addAnecdote(content)
    addNotification(`Added anecdote "${content}".`, 10)
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

export default connect(
  null,
  { addAnecdote, addNotification }
)(AnecdoteForm)
