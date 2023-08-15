import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer' 
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
		notification: notificationReducer
  }
})

console.log('store.getState() at the index.js', store.getState());

store.subscribe(() => {
  console.log('Store Updated!', store.getState());
})

export default store