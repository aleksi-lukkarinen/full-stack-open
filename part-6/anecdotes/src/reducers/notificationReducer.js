const DEF_NOTIF_CLEARING_DLY_IN_SEC = 5

const initialState = {
  creationTimestamp: 0,
  visibilityInSeconds: 0,
  content: undefined,
}

export function addNotification(
    content, visibilityInSeconds) {

  const visibilityTime =
    Number.isInteger(visibilityInSeconds) && visibilityInSeconds > 0
        ? visibilityInSeconds
        : DEF_NOTIF_CLEARING_DLY_IN_SEC

  return async dispatch => {
    // Handling the visibility of the notification is performed
    // in ./components/Notification.js in a bit better fashion than
    // done in the assignment.

    dispatch({
      type: "ADD_NOTIFICATION",
      data: {
        content,
        visibilityInSeconds: visibilityTime,
      }
    })
  }
}

export function clearNotification() {
  return async dispatch => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
    })
  }
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      const { data: sentNotification } = action

      return {
        creationTimestamp: Date.now(),
        visibilityInSeconds: sentNotification.visibilityInSeconds,
        content: sentNotification.content,
      }

    case "CLEAR_NOTIFICATION":
      return initialState

    default:
      return state
  }
}

export default notificationReducer
