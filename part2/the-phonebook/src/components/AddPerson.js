import { useState } from 'react'
import phoneService from '../services/Modules'

const AddPerson = ({ persons, setPersons, setMessage, setExpression }) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const addToList = (event) => {
		event.preventDefault()
		console.log('button clicked')
		if (newName === '')
			return window.alert(`You forgot to add a name!`)
		if (newNumber === '')
			return window.alert(`You forgot to add a number!`)
		if (persons.some(p => p.name === newName)) {
			const samePerson = persons.find(p => p.name === newName)
			console.log('i am the new person',samePerson);
			if (samePerson !== newNumber) {
				if (window.confirm(`${samePerson.name} is already added to phonebook, replace the old number with a new one`)) {
					const changeNumber = {...samePerson, number: newNumber}
					return (
						phoneService
							.update(changeNumber.id, changeNumber)
							.then(updateContact => {
								setPersons(persons.map(p => p.id === changeNumber.id ? changeNumber : p))
								setMessage(`${newName} number has been changed to ${newNumber}`)
								setExpression(false)
								setTimeout(() => {
									setMessage(null)
								}, 5000)
							})
							.catch(error => {
								setPersons(persons.filter(person => person.name !== changeNumber.name))
								setMessage(`${newName} has already been deleted from the server!`)
								setExpression(true)
								setTimeout(() => {
									setMessage(null)
									setExpression(false)
								}, 5000)
							})
					)
				}
				else
					return
			}
			else
				return window.alert(`${newName} is already in the phonebook`)
		}
		const newId = Math.max(...persons.map(person => person.id)) + 1
		const newObject = {
			name: newName,
			number: newNumber,
			id: newId
		}
		phoneService
			.create(newObject)
			.then(returnedObj => {
				setPersons(persons.concat(returnedObj))
				setMessage(`Added ${newName} to contacts`)
				setTimeout(() => {
					setMessage(null)
				}, 5000)
			})
			.catch(error => {
				console.log('Failed to create new object', error);
			})
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