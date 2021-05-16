
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

function counterReducer(currentState, action) {
  if (!currentState)
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

    const errorState = { ...currentState, error: { code: errCode, } }

    if (!Number.isInteger(e.code))
      errorState.error.reason = e

    return errorState
  }

  switch (action.type) {
    case ACTION_TYPES.GOOD:
      const good = currentState.good < Number.MAX_SAFE_INTEGER
        ? currentState.good + 1
        : Number.MAX_SAFE_INTEGER

      return {...currentState, good }

    case ACTION_TYPES.OK:
      const ok = currentState.ok < Number.MAX_SAFE_INTEGER
        ? currentState.ok + 1
        : Number.MAX_SAFE_INTEGER

      return {...currentState, ok }

    case ACTION_TYPES.BAD:
      const bad = currentState.bad < Number.MAX_SAFE_INTEGER
        ? currentState.bad + 1
        : Number.MAX_SAFE_INTEGER

      return {...currentState, bad }

    case ACTION_TYPES.ZERO:
      return {...STATE_INITIAL }

    default:
      return {
        ...currentState,
        error: { code: ERRORS.UNEXPECTED_ERROR, }
      }
  }
}

export default counterReducer
