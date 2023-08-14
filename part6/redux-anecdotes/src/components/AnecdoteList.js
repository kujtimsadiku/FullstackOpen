import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
			<br/>
		</li>
	)
}

const AnecdotesList = () => {	
	const anecdotes = useSelector(state => state.anecdoteReducer);
	const filter = useSelector(state => state.filterReducer);
	const dispatch = useDispatch();

	const filteredAnecdotes = anecdotes.filter(anecdote => 
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<ul>
      {filteredAnecdotes.sort((min, max) => max.votes - min.votes)
        .map(anecdote =>
          <Anecdote 
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => dispatch(voteFor(anecdote.id))}
					/>
        )
      }
		</ul>
	)
}

export default AnecdotesList