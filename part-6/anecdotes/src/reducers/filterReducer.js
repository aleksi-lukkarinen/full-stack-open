const initialState = ""


export function setFilter(filter) {
  return {
    type: "SET_FILTER",
    data: { filter }
  }
}

const filterReducer = (state = initialState, action) => {
  console.log("Filter state now: ", state)
  console.log("Filter action: ", action)

  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter

    default:
      return state
  }
}

export default filterReducer
