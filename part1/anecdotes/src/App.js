import { useState } from 'react'


/*
	HEADER
*/
const Header = ({ text }) => <h1>{text}</h1>

/*
	Print anecdotes text and votes 
*/
const Anec = (props) => {
	return (
		<div>
			<p>{props.text}</p>
			<p>has {props.votes} votes</p>
		</div>
	)
}

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>{props.text}</button>
	)
}

/*
	Checks the max number of the array,
	then we take the indexof the max number and we return it
*/
const MostVoted = (props) => {
	const maxNum = Math.max(...props.vote)
	const index = props.vote.indexOf(maxNum)
	return (
		<div>{props.anecdotes[index]}</div>
	)

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  // loop is for the random number to not come twice in a row
  const setToSelected = () => {
	let random = Math.floor(Math.random() * anecdotes.length)
	for (; selected === random;)
		random = Math.floor(Math.random() * anecdotes.length)
	setSelected(random)
	console.log(random)
  }
  const setToVote = () => {
	const voted = [...vote]
	voted[selected] += 1
	setVote(voted)
	console.log(voted)
  }
  
  return (
    <div>
		<Header text='Anecdote of the day'/>
		<Anec text={anecdotes[selected]} votes={vote[selected]}/>
		<Button handleClick={setToVote} text='vote'/>
		<Button handleClick={setToSelected} text='next anecdotes'/>
		<Header text='Anecdote with most votes'/>
		<MostVoted vote={vote} anecdotes={anecdotes}/>
    </div>
  )
}

export default App