import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer' 

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer
  }
})

console.log('store.getState() at the index.js', store.getState());

store.subscribe(() => {
  console.log('Store Updated!', store.getState());
})

export default store