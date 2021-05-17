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

export function voteAnecdote(anecdoteToVote) {
  return async dispatch => {
    const anecdoteToUpdate = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }

    const updatedAnecdote =
      await AnecdoteService.update(anecdoteToUpdate)

    dispatch({
      type: "UPDATE_ANECDOTE",
      data: updatedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
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
        id: sentAnecdote.id,
        content: sentAnecdote.content,
        votes: sentAnecdote.votes || 0,
      }
      return [...state, anecdoteToAdd]

    case "UPDATE_ANECDOTE":
      const { data: updatedAnecdote } = action
      const resultState = state.map(oldAnecdote => {
        return oldAnecdote.id === updatedAnecdote.id
            ? updatedAnecdote
            : oldAnecdote
      })
      return resultState

    default:
      return state
  }
}

export default anecdoteReducer
