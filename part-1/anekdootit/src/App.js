import React, { useState } from 'react'

const RandomAnecdote = ({config}) => {
  let anecdote = config.labelNoAnecdotes;

  if (config.anecdotes.length > 1) {
    let r = config.currentlySelected
    while (r === config.currentlySelected) {
      r = Math.floor(Math.random() * config.anecdotes.length)
    }
    anecdote = config.anecdotes[r]
  }
  else if (config.anecdotes.length === 1) {
    anecdote = config.anecdotes[0]
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
  }

  return <RandomAnecdote config={config} />
}

export default App
