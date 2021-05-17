
const initialState = {
  content: "",
}

export function addNotification(content) {
  return {
    type: "ADD",
    data: { content }
  }
}


const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "ADD":
      const { data: sentNotification } = action
      return { content: sentNotification.content }

    default:
      return state
  }
}

export default notificationReducer
