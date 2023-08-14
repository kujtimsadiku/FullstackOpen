import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer'; // Update the path as needed

const AnecdotesForm = () => {
  const dispatch = useDispatch();

	const addAnecdotes = (event) => {
		event.preventDefault();
		const content = event.target.anecdotes.value;
		console.log('Anecdotes to add:', content);

		content === ''
			? console.log('Content is empty')
			: dispatch(addAnecdote(content));

		event.target.anecdotes.value = '';
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdotes}>
				<div><input name='anecdotes'/></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdotesForm;