
const DEFAULT_STATE = null

const ACTION_SET_CURRENT_USER = "SET_CURRENT_USER"
const ACTION_CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER"


const currentUserReducer = (state = DEFAULT_STATE, action = null) => {
  switch (action.type) {
    case ACTION_SET_CURRENT_USER:
      return action.user

    case ACTION_CLEAR_CURRENT_USER:
      return DEFAULT_STATE

    default:
      return state
  }
}


export const setCurrentUser = user => {
  return {
    type: ACTION_SET_CURRENT_USER,
    user
  }
}

export const clearCurrentUser = () => {
  return {
    type: ACTION_CLEAR_CURRENT_USER,
  }
}


export default currentUserReducer
