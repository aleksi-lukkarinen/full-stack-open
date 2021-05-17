import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"
import AnecdoteComparisons from "../utils/anecdoteComparisons"



const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const handleVoting = id => {
    console.log("vote", id)
    dispatch(voteAnecdote(id))
  }

  anecdotes.sort(AnecdoteComparisons.byVotesContent)

  return (
    <>
      <h3>Saved Anecdotes</h3>
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
    </>
  )
}

export default AnecdoteList
