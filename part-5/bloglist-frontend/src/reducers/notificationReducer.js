
const DEFAULT_VALUE = { info: null, error: null }

const ACTION_SET_INFO = "SET_ERROR_NOTIFICATION"
const ACTION_CLEAR_INFO = "CLEAR_ERROR_NOTIFICATION"
const ACTION_SET_ERROR = "SET_INFO_NOTIFICATION"
const ACTION_CLEAR_ERROR = "CLEAR_INFO_NOTIFICATION"


const notificationReducer = (state, action) => {
  let newState = undefined
  switch (action.type) {
    case ACTION_SET_INFO:
      newState = { ...state, info: action.text }
      break

    case ACTION_SET_ERROR:
      newState = { ...state, error: action.text }
      break

    case ACTION_CLEAR_INFO:
      newState = { ...state, info: null }
      break

    case ACTION_CLEAR_ERROR:
      newState = { ...state, error: null }
      break

    default:
      newState = DEFAULT_VALUE
  }

  return newState
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
