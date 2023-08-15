import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

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
	const dispatch = useDispatch();
	const anecdotes = useSelector(state => state.anecdote);
	const filter = useSelector(state => state.filter);

	const filteredAnecdotes = anecdotes.filter(anecdote =>
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	)

	const handleVote = (id, content) => {
		dispatch(voteFor(id));
		dispatch(showNotificationWithTimeout(`You voted: ${content}`, 5000));
	}

	return (
		<ul>
      {filteredAnecdotes.sort((min, max) => max.votes - min.votes)
        .map(anecdote =>
          <Anecdote 
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => handleVote(anecdote.id, anecdote.content)}
					/>
        )
      }
		</ul>
	)
}

export default AnecdotesList