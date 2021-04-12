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
    let r = randomAnecdoteIndex(config.anecdotes.length, config.currentlySelected)
    config.selectedSetter(r)
  }

  return <button onClick={clickHandler}>{config.labelNextAnecdote}</button>
}

const RandomAnecdoteDisplay = ({config}) => {
  let anecdote = config.labelNoAnecdotes
  if (config.anecdotes.length > 0) {
    anecdote = config.anecdotes[config.currentlySelected]
  }

  return <span>{anecdote}</span>
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

  const [selected, setSelected] = useState(0)
  const config = {
    anecdotes: anecdotes,
    currentlySelected: selected,
    selectedSetter: setSelected,
    labelNoAnecdotes: "<no anecdotes>",
    labelNextAnecdote: "Next Anecdote",
  }

  const buttonNextAnecdote = anecdotes.length > 0 ? <NextAnecdoteButton config={config} /> : "";

  return (
    <>
      {buttonNextAnecdote}
      <div><RandomAnecdoteDisplay config={config} /></div>
    </>
  )
}

export default App
