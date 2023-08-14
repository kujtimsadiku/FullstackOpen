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
	const anecdotes = useSelector(state => state);
	const dispatch = useDispatch();

	return (
		<ul>
      {anecdotes.sort((min, max) => max.votes - min.votes)
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