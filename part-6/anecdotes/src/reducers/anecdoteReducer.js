const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export function initAnecdotes(anecdotes) {
  return {
    type: "INIT_ANECDOTES",
    data: { anecdotes }
  }
}

export function newAnecdote(content) {
  return {
    type: "NEW_ANECDOTE",
    data: { content }
  }
}

export function voteAnecdote(id) {
  return {
    type: "VOTE_ANECDOTE",
    data: { id }
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log("Anecdote state now: ", state)
  console.log("Anecdote action: ", action)

  switch (action.type) {
    case "INIT_ANECDOTES":
      const { data: { anecdotes: sentAnecdotes } } = action
      const lst = []
      sentAnecdotes.forEach(a => {
        lst.push({
          id: a.id,
          content: a.content,
          votes: a.votes || 0,
        })
      })
      return lst

    case "NEW_ANECDOTE":
      const { data: sentAnecdote } = action
      const anecdoteToAdd = {
        content: sentAnecdote.content,
        id: getId(),
        votes: 0,
      }
      return [...state, anecdoteToAdd]

    case "VOTE_ANECDOTE":
      const idOfVoted = action.data.id
      const anecdoteToUpdate = state.find(x => x.id === idOfVoted)

      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      }

      return state.map(x => x.id === idOfVoted ? updatedAnecdote : x)

    default:
      return state
  }
}

export default anecdoteReducer
