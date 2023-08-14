const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const newVote = state.find(anecdote => anecdote.id === action.payload.id);
      newVote.votes += 1;
      const vote = state.map(anecdote => anecdote.id === action.payload.votes ? newVote : anecdote);
      return vote
    case 'ANECDOTES':
      const anecdote = {
        content: action.payload.anecdote,
        id: action.payload.id,
        votes: 0
      }
      const newAnecdotes = [...state, anecdote]
      return newAnecdotes
    default : return state
  }
}

export const voteFor = (id) => { return { type: 'VOTE', payload: {id} }}
export const addAnecdote = (anecdote) => {
  return { type: 'ANECDOTES', payload: { anecdote, id: getId() }}
}

export default reducer