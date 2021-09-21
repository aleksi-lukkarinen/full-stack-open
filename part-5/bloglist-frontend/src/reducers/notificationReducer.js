
const DEFAULT_STATE = { info: null, error: null }

const ACTION_SET_INFO = "SET_INFO_NOTIFICATION"
const ACTION_CLEAR_INFO = "CLEAR_INFO_NOTIFICATION"
const ACTION_SET_ERROR = "SET_ERROR_NOTIFICATION"
const ACTION_CLEAR_ERROR = "CLEAR_ERROR_NOTIFICATION"



const notificationReducer = (state = DEFAULT_STATE, action = null) => {
  switch (action.type) {
    case ACTION_SET_INFO:
      return { ...state, info: action.text }

    case ACTION_SET_ERROR:
      return { ...state, error: action.text }

    case ACTION_CLEAR_INFO:
      return { ...state, info: null }

    case ACTION_CLEAR_ERROR:
      return { ...state, error: null }

    default:
      return state
  }
}


export const setInfoNotification = text => {
  return {
    type: ACTION_SET_INFO,
    text
  }
}

export const clearInfoNotification = () => {
  return {
    type: ACTION_CLEAR_INFO,
  }
}


export const setErrorNotification = text => {
  return {
    type: ACTION_SET_ERROR,
    text
  }
}

export const clearErrorNotification = () => {
  return {
    type: ACTION_CLEAR_ERROR,
  }
}


export default notificationReducer
