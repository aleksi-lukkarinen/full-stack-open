import React from "react"
import { useSelector, useDispatch } from "react-redux"
import AnecdoteForm from "./components/AnecdoteForm"

import { voteAnecdote } from "./reducers/anecdoteReducer"
import AnecdoteComparisons from "./utils/anecdoteComparisons"



const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVoting = id => {
    console.log("vote", id)
    dispatch(voteAnecdote(id))
  }

  anecdotes.sort(AnecdoteComparisons.byVotesContent)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />

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
    </div>
  )
}

export default App