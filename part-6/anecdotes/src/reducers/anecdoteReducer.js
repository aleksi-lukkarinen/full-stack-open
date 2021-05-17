import AnecdoteService from "../services/anecdoteService"


export function initAnecdotes() {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()

    dispatch({
      type: "INIT_ANECDOTES",
      data: { anecdotes }
    })
  }
}

export function addAnecdote(content) {
  return async dispatch => {
    const createdAnecdote =
        await AnecdoteService.createNew(content)

    dispatch({
      type: "NEW_ANECDOTE",
      data: createdAnecdote
    })
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
      console.log("action:", action)
      const { data: { anecdotes: sentAnecdotes } } = action
      const lst = []
      console.log("sentAnecdotes:", sentAnecdotes)
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
