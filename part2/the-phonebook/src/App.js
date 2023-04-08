import { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import Headers from './components/Headers'
import phoneServices from './services/Modules'

const App = () => {
	const [newSearch, setNewSearch] = useState('')
	const [persons, setPersons] = useState([
	]) 

	useEffect(() => {
		phoneServices
			.getAll()
			.then(response => {
				setPersons(response)
			})
			.catch(error => {
				console.log('Errror fetching data', error);
			})
	}, [])

	const handleSearchChange = (event) => {
		console.log(event.target.value)
		setNewSearch(event.target.value)
	}

	const deleteFromPhoneBook = id => {
		const deletePerson = persons.find(person => person.id === id)

		if (window.confirm(`Are you sure you want to delete ${deletePerson.name}`))
		{
			phoneServices
				.remove(id)
				.then(returnedDelete => {
					persons.map(person => person.id !== id ? person : returnedDelete)
				})
				.catch(error => {
					console.log('Failed to delete number from the phonebook', error);
				})
				setPersons(persons.filter(person => person.id !== id))
		}
	}

	const printNames = (names) => {
		console.log(names);
		if (names.length === '')
			return ''
		return (
			names.map((name, index) => (
			<tr key={name.id}>
				<td>
					{name.name} {name.number}
					<button onClick={() => deleteFromPhoneBook(name.id)}>delete</button>
				</td>
			</tr>
			))
		)
	}

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(newSearch.toLowerCase()))

	return (
		<div>
			<Headers text='Phonebook' tag='h1'/>
			<div>
				Filter shown with <input value={newSearch} onChange={handleSearchChange}/>
			</div>
			<Headers text='Add a new' tag='h2'/>
			<AddPerson persons={persons} setPersons={setPersons} />
			<Headers text='Number' tag='h2'/>
			<table>
				<tbody>
					{printNames(filteredPersons)}
				</tbody>
			</table>
		</div>
	)
}

export default App