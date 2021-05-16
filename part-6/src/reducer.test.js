import deepFreeze from "deep-freeze"

import counterReducer from "./reducer"
import {
  ACTION_TYPES,
  ERRORS as REDUCER_ERRORS,
} from "./reducer"


const initialState = Object.freeze({
  good: 0,
  ok: 0,
  bad: 0,
})

const MAX_INT = Number.MAX_SAFE_INTEGER


function makeTest(action) {
  return (currentState, expectedState) => {
    if (currentState)
      deepFreeze(currentState)

    const newState = counterReducer(currentState, action)

    expect(newState).toEqual(expectedState)
  }
}

describe("UniCafe reducer should", () => {
  test("return the initial state when the given state is undefined", () => {
    makeTest({})(undefined, initialState)
  })

  describe("return a proper error for invalid actions:", () => {
    const invalidActionsAndErrorCodes = [
      [undefined,                     REDUCER_ERRORS.MISSING_ACTION],
      [null,                          REDUCER_ERRORS.MISSING_ACTION],
      [4,                             REDUCER_ERRORS.ACTION_NOT_OBJECT],
      ["test",                        REDUCER_ERRORS.ACTION_NOT_OBJECT],
      [true,                          REDUCER_ERRORS.ACTION_NOT_OBJECT],
      [Symbol("test"),                REDUCER_ERRORS.ACTION_NOT_OBJECT],
      [{},                            REDUCER_ERRORS.EMPTY_ACTION],
      [{ type: undefined },           REDUCER_ERRORS.MISSING_ACTION_TYPE],
      [{ type: "<unknown-action>" },  REDUCER_ERRORS.UNKNOWN_ACTION_TYPE]
    ]
    test.each(invalidActionsAndErrorCodes)("%s", (action, errCode) => {
      const expectedState = {
        ...initialState,
        error: { code: errCode }
      }

      const t = makeTest(action)
      t(initialState, expectedState)
    })
  })

  describe("increment counters in 0..MAX_SAFE_INTEGER:", () => {
    const incrementCases = [
      [ACTION_TYPES.GOOD,  initialState,                    { good: 1, ok: 0, bad: 0, }],
      [ACTION_TYPES.GOOD,  { good: 1, ok: 0, bad: 0, },     { good: 2, ok: 0, bad: 0, }],
      [ACTION_TYPES.OK,    initialState,                    { good: 0, ok: 1, bad: 0, }],
      [ACTION_TYPES.OK,    { good: 0, ok: 1, bad: 0, },     { good: 0, ok: 2, bad: 0, }],
      [ACTION_TYPES.BAD,   initialState,                    { good: 0, ok: 0, bad: 1, }],
      [ACTION_TYPES.BAD,   { good: 0, ok: 0, bad: 1, },     { good: 0, ok: 0, bad: 2, }],
    ]
    test.each(incrementCases)("%s: %s --> %s", (action, initial, expected) => {
      const t = makeTest({type: action})
      t(initial, expected)
    })
  })

  describe("limit the counters to MAX_SAFE_INTEGER:", () => {
    const upperLimitCases = [
      [ACTION_TYPES.GOOD,  { good: MAX_INT - 1, ok: 0, bad: 0, }, { good: MAX_INT, ok: 0, bad: 0, }],
      [ACTION_TYPES.GOOD,  { good: MAX_INT,     ok: 0, bad: 0, }, { good: MAX_INT, ok: 0, bad: 0, }],
      [ACTION_TYPES.OK,    { good: 0, ok: MAX_INT - 1, bad: 0, }, { good: 0, ok: MAX_INT, bad: 0, }],
      [ACTION_TYPES.OK,    { good: 0, ok: MAX_INT,     bad: 0, }, { good: 0, ok: MAX_INT, bad: 0, }],
      [ACTION_TYPES.BAD,   { good: 0, ok: 0, bad: MAX_INT - 1, }, { good: 0, ok: 0, bad: MAX_INT, }],
      [ACTION_TYPES.BAD,   { good: 0, ok: 0, bad: MAX_INT,     }, { good: 0, ok: 0, bad: MAX_INT, }],
    ]
    test.each(upperLimitCases)("%s: %s --> %s", (action, initial, expected) => {
      const t = makeTest({type: action})
      t(initial, expected)
    })
  })

  test("reset the state when given the ZERO action", () => {
    const t = makeTest({ type: ACTION_TYPES.ZERO })

    t({ good: 7, ok: 3, bad: 8, }, { good: 0, ok: 0, bad: 0, })
  })

})
