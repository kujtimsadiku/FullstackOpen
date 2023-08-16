import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => axios.get(baseUrl).then(res => res.data);

export const createAnecdote = (anecdote) => axios.post(baseUrl, anecdote).then(res => res.data);

export const updateVote = (newAnecdote) => axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote).then(res => res.data);