import AnecdotesForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App