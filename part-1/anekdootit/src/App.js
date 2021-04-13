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

const SectionTitle = ({content}) => <h1>{content}</h1>

const NextAnecdoteButton = ({config}) => {
  const clickHandler = () => {
    const nextState = {
      ...config.state,
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

    const increasedVotesNumber =
            nextState.anecdoteVotes[nextState.visibleAnecdote] + 1

    nextState.anecdoteVotes[nextState.visibleAnecdote] = increasedVotesNumber

    if (increasedVotesNumber > config.state.largestNumberOfVotes) {
      nextState.largestNumberOfVotes = increasedVotesNumber
      nextState.anecdoteWithLargestNumberOfVotes = config.state.visibleAnecdote
    }

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

const SectionAnecdoteOfTheDay = ({config}) => {
  let controls = "";
  if (config.anecdotes.length > 0) {
    controls =
      <>
        <NextAnecdoteButton config={config} />
        <VoteAnecdoteButton config={config} />
        <AnecdoteVotesDisplay config={config} />
      </>
  }

  return (
    <>
      <SectionTitle content={config.sectionTitleAnecdoteOfTheDay} />
      {controls}
      <div><RandomAnecdoteDisplay config={config} /></div>
    </>
  )
}

const MostVotedAnecdoteDisplay = ({config}) => {
  let anecdote = config.labelNoAnecdotes
  if (config.anecdotes.length > 0) {
    anecdote = config.anecdotes[config.state.anecdoteWithLargestNumberOfVotes]
  }

  return <span>{anecdote}</span>
}

const SectionMostVotedAnecdote = ({config}) => {
  return (
    <>
      <SectionTitle content={config.sectionTitleMostVotedAnecdote} />
      <MostVotedAnecdoteDisplay config={config} />
    </>
  )
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
    largestNumberOfVotes: 0,
    anecdoteWithLargestNumberOfVotes: 0,
  })
  const config = {
    anecdotes: anecdotes,
    sectionTitleAnecdoteOfTheDay: "Anecdote of the Day",
    sectionTitleMostVotedAnecdote: "Anecdote with Most Votes",
    labelNextAnecdote: "Next Anecdote",
    labelVoteAnecdote: "Vote",
    labelNoAnecdotes: "<no anecdotes>",
    state: currentState,
    updateState: updateState,
  }

  let sectionMostVoted = ""
  if (anecdotes.length > 0) {
    sectionMostVoted = <SectionMostVotedAnecdote config={config} />
  }

  return (
    <>
      <SectionAnecdoteOfTheDay config={config} />
      {sectionMostVoted}
    </>
  )
}

export default App
