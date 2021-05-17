const initialState = {
  timestamp: 0,
  content: undefined,
}

export function addNotification(content) {
  return {
    type: "ADD_NOTIFICATION",
    data: { content }
  }
}

export function clearNotification() {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}


const notificationReducer = (state = initialState, action) => {
  console.log("Notification state now: ", state)
  console.log("Notification action: ", action)

  switch (action.type) {
    case "ADD_NOTIFICATION":
      const timestamp = Date.now()
      const { data: sentNotification } = action

      return {
        timestamp,
        content: sentNotification.content
      }

    case "CLEAR_NOTIFICATION":
      return initialState

    default:
      return state
  }
}

export default notificationReducer
