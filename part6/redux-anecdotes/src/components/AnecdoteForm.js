import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

	const createHandler = async (event) => {
		event.preventDefault();
		const content = event.target.anecdotes.value;
		event.target.anecdotes.value = '';

		console.log('Anecdotes to add:', content);
		if (content === '') {
			console.log('Content is empty')
			return ;
		}
		dispatch(createAnecdote(content, `You have created new: ${content}`));
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