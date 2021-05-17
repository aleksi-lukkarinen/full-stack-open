import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"
import AnecdoteComparisons from "../utils/anecdoteComparisons"
import Filter from "./Filter"



const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter).toLowerCase()
  const dispatch = useDispatch()

  const handleVoting = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(addNotification(
      `You voted anecdote "${anecdote.content}".`))
  }

  const anecdotesToDisplay = anecdotes
          .filter(a => a.content.toLowerCase().includes(filter))
          .sort(AnecdoteComparisons.byVotesContent)

  return (
    <>
      <h3>Saved Anecdotes</h3>

      <Filter />

      {anecdotesToDisplay.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoting(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
