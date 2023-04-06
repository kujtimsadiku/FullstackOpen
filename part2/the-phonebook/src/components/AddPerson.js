import { useState } from 'react'


const AddPerson = ({ persons, setPersons }) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const addToList = (event) => {
		event.preventDefault()
		console.log('button clicked')
		if (newName === '')
			return window.alert(`You forgot to add a name!`)
		if (newNumber === '')
			return window.alert(`You forgot to add a number!`)
		if (persons.some(person => newName === person.name))
			return window.alert(`${newName} is already in the phonebook`)
		const newId = Math.max(...persons.map(person => person.id)) + 1
		const newObject = {
			name: newName,
			number: newNumber,
			id: newId
		}
		setPersons(persons.concat(newObject))
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}

	return (
		<div>
			<form onSubmit={addToList}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					<br/>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
}

export default AddPerson