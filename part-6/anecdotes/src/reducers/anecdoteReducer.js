
export function initAnecdotes(anecdotes) {
  return {
    type: "INIT_ANECDOTES",
    data: { anecdotes }
  }
}

export function addAnecdote(anecdoteToAdd) {
  return {
    type: "NEW_ANECDOTE",
    data: anecdoteToAdd
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
      console.log("REDUCER:", action)
      const { data: sentAnecdote } = action
      const anecdoteToAdd = {
        id: sentAnecdote.id,
        content: sentAnecdote.content,
        votes: sentAnecdote.votes || 0,
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
