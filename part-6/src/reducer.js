
export const ACTION_TYPES = Object.freeze({
  GOOD: "GOOD",
  OK: "OK",
  BAD: "BAD",
  ZERO: "ZERO",
})

export const ERRORS = Object.freeze({
  UNEXPECTED_ERROR: -1,
  MISSING_ACTION: 0,
  EMPTY_ACTION: 1,
  ACTION_NOT_OBJECT: 2,
  MISSING_ACTION_TYPE: 3,
  UNKNOWN_ACTION_TYPE: 4,
})

const STATE_INITIAL = Object.freeze({
  good: 0,
  ok: 0,
  bad: 0
})

function reducerError(errorCode) {
  const e = new Error()
  e.code = errorCode
  return e
}

function counterReducer(state, action) {
  if (!state)
    return { ...STATE_INITIAL }

  try {
    if (!action) {
      throw reducerError(ERRORS.MISSING_ACTION)
    }
    else if (typeof(action) !== "object") {
      throw reducerError(ERRORS.ACTION_NOT_OBJECT)
    }
    else if (Object.keys(action).length === 0) {
      throw reducerError(ERRORS.EMPTY_ACTION)
    }
    else if (!action.type) {
      throw reducerError(ERRORS.MISSING_ACTION_TYPE)
    }
    else if (!Object.values(ACTION_TYPES).includes(action.type)) {
      throw reducerError(ERRORS.UNKNOWN_ACTION_TYPE)
    }
  }
  catch (e) {
    const errCode = Number.isInteger(e.code)
            ? e.code : ERRORS.UNEXPECTED_ERROR

    const errorState = { ...state, error: { code: errCode, } }

    if (!Number.isInteger(e.code))
      errorState.error.reason = e

    return errorState
  }

  switch (action.type) {
    case ACTION_TYPES.GOOD:
      if (state.good < Number.MAX_SAFE_INTEGER)
        return {...state, good: state.good + 1 }
      else
        return {...state, good: Number.MAX_SAFE_INTEGER }

    case ACTION_TYPES.OK:
      if (state.ok < Number.MAX_SAFE_INTEGER)
        return {...state, ok: state.ok + 1 }
      else
        return {...state, ok: Number.MAX_SAFE_INTEGER }

    case ACTION_TYPES.BAD:
      if (state.bad < Number.MAX_SAFE_INTEGER)
        return {...state, bad: state.bad + 1 }
      else
        return {...state, bad: Number.MAX_SAFE_INTEGER }

    case ACTION_TYPES.ZERO:
      return {...STATE_INITIAL }

    default:
      return {
        ...state,
        error: { code: ERRORS.UNKNOWN_ACTION, }
      }
  }
}

export default counterReducer
