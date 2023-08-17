import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAll, updateVote } from './services/anecdotes';
import { useNotificationDispatch } from './notificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newVotedMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    }
  });

  const handleVote = (anecdote) => {
    newVotedMutation.mutate({ anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: 'VOTED', message: anecdote.content });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEARNOTIFICATION' });
    }, 5000)
  }

  const anecdotes = useQuery(
    'anecdotes',
    getAll,
    { retry: 1 }
  );
  
  console.log('anecdote', anecdotes);

  if (anecdotes.isLoading)
   return console.log('Loading...');
  if (anecdotes.isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.data.sort((min, max) => max.votes - min.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
