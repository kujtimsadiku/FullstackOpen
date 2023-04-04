import React from 'react'

var nimi = 'name'
var exe = 'exercises'

const Header = (props) => {
	return (
		<div>
			<h1>{props.course.name}</h1>
		</div>
	)
}

const Part = (props) => {
	return (
		<div>
			<p>{props.content[nimi]} {props.content[exe]}</p>
		</div>
	)
}


const Content = (props) => {
	return (
		<div>
			<Part content={props.content[0]} />
			<Part content={props.content[1]} />
			<Part content={props.content[2]} />
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>Total of exercises is: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
		</div>
	)
}


const App = () => {
	const course = {
		name: 'Half Stack application development',
		part: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}
	return (
		<div>
			<Header course={course.name} />
			<Content content={course.part} />
			<Total total={course.part} />
	  </div>
	)
}

export default App