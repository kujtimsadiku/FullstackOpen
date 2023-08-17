import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotes";
import { useNotificationDispatchWithTimeout } from '../notificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatchWithTimeout();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  });

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    newAnecdoteMutation.mutate({ content, votes: 0 });

    if (content.length <= 4) {
      notificationDispatch('SHORTANECDOTE', {duration: 5})
    } else if (!newAnecdoteMutation.isError) {
      notificationDispatch('NEWCREATED', content, 5);
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
