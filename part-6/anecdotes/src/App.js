import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { voteAnecdote, newAnecdote } from "./reducers/anecdoteReducer"
import AnecdoteComparisons from "./utils/anecdoteComparisons"



const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVoting = id => {
    console.log("vote", id)
    dispatch(voteAnecdote(id))
  }

  const handleAddition = event => {
    event.preventDefault()

    const content = event.target.content.value
    dispatch(newAnecdote(content))
  }

  anecdotes.sort(AnecdoteComparisons.byVotesContent)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoting(anecdote.id)}>Vote</button>
          </div>
        </div>
      )}
      <h2>Create New</h2>
      <form onSubmit={handleAddition}>
        <div><input name="content" /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default App