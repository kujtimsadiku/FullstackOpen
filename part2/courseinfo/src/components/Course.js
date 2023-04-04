import React from 'react'

const Header = ({ header }) => <h2>{ header }</h2>

const Part = ({ id, name, exercises }) => <p key={id}>{name} {exercises}</p>

const Content = ({ content }) => {
	console.log(content);
	return (
		<div>
			{content.map(({name, exercises, id}) => (<Part key={id} name={name} exercises={exercises} />))}
		</div>
	)
}

const Total = ({ exercises }) => {
	const total = exercises.reduce((sum, order) => sum + order.exercises, 0)
	console.log('The total ammount:', total);
	return (
		<div>
			<strong>Total of exercises is: {total}</strong>
		</div>
	)
}


const Course = ({course}) => {
	console.log(course.name)
	return (
		<div>
			<Header header={course.name} />
			<Content content={course.parts} />
			<Total exercises={course.parts} />
		</div>
	)
}

export default Course