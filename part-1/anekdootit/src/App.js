import React, { useState } from 'react'

function randomAnecdoteIndex(numAvailable, currentlySelected) {
  if (numAvailable < 1)
    throw Error("No anecdotes available");

  if (numAvailable === 1)
    return 0;

  let r = currentlySelected
  while (r === currentlySelected) {
    r = Math.floor(Math.random() * numAvailable)
  }
  return r
}

const NextAnecdoteButton = ({config}) => {
  const clickHandler = () => {
    const nextState = {
      anecdoteVotes: [...config.state.anecdoteVotes],
      visibleAnecdote: randomAnecdoteIndex(
          config.anecdotes.length,
          config.state.visibleAnecdote),
    }
    config.updateState(nextState)
  }

  return <button onClick={clickHandler}>{config.labelNextAnecdote}</button>
}

const VoteAnecdoteButton = ({config}) => {
  const clickHandler = () => {
    const nextState = {
      ...config.state,
      anecdoteVotes: [...config.state.anecdoteVotes]
    }
    nextState.anecdoteVotes[nextState.visibleAnecdote] += 1
    config.updateState(nextState)
  }

  return <button onClick={clickHandler}>{config.labelVoteAnecdote}</button>
}

const RandomAnecdoteDisplay = ({config}) => {
  let anecdote = config.labelNoAnecdotes
  if (config.anecdotes.length > 0) {
    anecdote = config.anecdotes[config.state.visibleAnecdote]
  }

  return <span>{anecdote}</span>
}

const AnecdoteVotesDisplay = ({config}) => {
  const v = config.state.anecdoteVotes[config.state.visibleAnecdote]
  return <div>Has {v} votes</div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ]
  const [currentState, updateState] = useState({
    visibleAnecdote: 0,
    anecdoteVotes: Array(anecdotes.length).fill(0),
  })
  const config = {
    anecdotes: anecdotes,
    labelNextAnecdote: "Next Anecdote",
    labelVoteAnecdote: "Vote",
    labelNoAnecdotes: "<no anecdotes>",
    state: currentState,
    updateState: updateState,
  }

  let controls = "";
  if (anecdotes.length > 0) {
    controls =
      <>
        <NextAnecdoteButton config={config} />
        <VoteAnecdoteButton config={config} />
        <AnecdoteVotesDisplay config={config} />
      </>
  }

  return (
    <>
      {controls}
      <div><RandomAnecdoteDisplay config={config} /></div>
    </>
  )
}

export default App
