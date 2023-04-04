import { useState } from 'react'


//	----- For printing Headers ------
const Heading = ({ header }) => <h1>{ header }</h1>

/* 		----- StatisticsLine ------
	StatisticsLine takes text=(what to print) value=(the value to be printed)
		if the text is equal to '%' we print '%' also
 */ 
const StatisticsLine = ({ text, value }) => {
	if (text === 'positive')
		return (
			<tr>
				<td>{text} {value}%</td>
			</tr>
		)	
	return (
		<tr>
			<td>{text} {value}</td>
		</tr>
	)
}


/* 		----- Statistics ------
	First I check if the sum of the reviews is == 0 and if it is
	we return No feedback given until the one of the three buttons is pressed.

	We have three const functions that we use here for calculation.
		averageSum	= to calculate the average: value (good - bad) / sum
		positiveSum	= to calculate the positive: value (good) / sum * 100 
		allSum		= fast calculation to add all up (good + neutral + bad)

	Returning the element <table> <tbody></tbody> </table> for some reason i couldn't 
	make it work without the <tbody> 
*/
const Statistics = (props) => {
	if ((props.good + props.neutral + props.bad) === 0)
		return (
			<div>No feedback given</div>
		)
	const averageSum = (a, b ,c) => {
		let sum = (a - c) / (a+b+c)
		return (sum)
	}

	const positiveSum = (a, b, c) => {
		let sum = a + b + c
		return (
			a / sum * 100
		)
	}

	const allSum = (a, b, c) => (a + b + c)

	return (
		<table>
			<tbody>
				<StatisticsLine text='good' value={props.good} />
				<StatisticsLine text='neutral' value={props.neutral} />
				<StatisticsLine text='bad' value={props.bad} />
				<StatisticsLine text='all' value={allSum(props.good, props.neutral, props.bad)} />
				<StatisticsLine text='average' value={averageSum(props.good, props.neutral, props.bad).toFixed(1)} />
				<StatisticsLine text='positive' value={positiveSum(props.good, props.neutral, props.bad)} />
			</tbody>
		</table>		

	)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addValueGood = () => {
	let newGoodValue = good + 1
	setGood(newGoodValue)
	console.log('newGoodValue ----', newGoodValue)
  }

  const addValueNeutral = () => {
	let newNeutralValue = neutral + 1
	setNeutral(newNeutralValue)
	console.log('newNeutralValue ----', newNeutralValue)
  }

  const addValueBad = () => {
	let newBadValue = bad + 1
	setBad(newBadValue)
	console.log('newBadValue ----', newBadValue)
  }

  return (
	<div>
		<Heading header='Give feedback' />
		<button onClick={addValueGood}>good</button>
		<button onClick={addValueNeutral}>neutral</button>
		<button onClick={addValueBad}>bad</button>
		<h1>Statics</h1>
		<Statistics good={good} neutral={neutral} bad={bad}/>
	</div>
  )
}

export default App;
