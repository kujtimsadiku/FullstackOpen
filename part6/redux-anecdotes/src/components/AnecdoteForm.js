import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'; // Update the path as needed
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

	const createHandler = (event) => {
		event.preventDefault();
		const content = event.target.anecdotes.value;

		console.log('Anecdotes to add:', content);

		if (content === '') {
			console.log('Content is empty')
			return ;
		}

		dispatch(createAnecdote(content));
		dispatch(showNotificationWithTimeout(`You created anecdote: ${content}`, 5000))

		event.target.anecdotes.value = '';
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createHandler}>
				<div><input name='anecdotes'/></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdotesForm;