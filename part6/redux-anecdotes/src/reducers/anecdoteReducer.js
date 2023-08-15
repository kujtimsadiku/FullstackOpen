import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote"
import { showNotificationWithTimeout } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload.id;

      return state.map(anecdote =>
        anecdote.id === id ? action.payload : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
})

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote, message) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(showNotificationWithTimeout(`${message}`, 5))
  }
}

export const updateVote = (anecdote, message) => {
  return async dispatch => {
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const update = await anecdoteService.update(anecdote.id, voted)
    dispatch(voteFor(update));
    dispatch(showNotificationWithTimeout(`${message}`, 5))
  }
}

export default anecdoteSlice.reducer