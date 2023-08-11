import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }

    const state = initialState

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset to zero', () => {
    const action = {
      type: 'ZERO'
    }

    const state = initialState

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('good and bad is incremented to 2 and ok is incremented by 1', () => {
    const actionGood = {
      type: 'GOOD'
    }

    const actionOk = {
      type: 'OK'
    }

    const actionBad = {
      type: 'BAD'
    }

    const state = initialState;

    deepFreeze(state);
    let newState = counterReducer(state, actionGood);
    newState = counterReducer(newState, actionGood);
    newState = counterReducer(newState, actionBad);
    newState = counterReducer(newState, actionBad);
    newState = counterReducer(newState, actionOk);

    expect(newState).toEqual({
      good: 2,
      ok: 1,
      bad: 2
    })
  })
})