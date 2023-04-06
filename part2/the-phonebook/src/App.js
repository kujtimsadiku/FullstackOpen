import { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import Headers from './components/Headers'
import axios from 'axios'

const App = () => {
	const [newSearch, setNewSearch] = useState('')
	const [persons, setPersons] = useState([
		// { name: 'Arto Hellas', number: '040-123456', id: 1 },
    	// { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    	// { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    	// { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]) 

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
			.catch(error => {
				console.log('Error fetching data', error);
			})
	}, [])

	const handleSearchChange = (event) => {
		console.log(event.target.value)
		setNewSearch(event.target.value)
	}

	const printNames = (names) => {
		console.log(names);
		if (names.length === '')
			return ''
		return (
			names.map((name, index) => (
			<tr key={name.id}>
				<td>{name.name} {name.number}</td>
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
				<tbody>{printNames(filteredPersons)}</tbody>
			</table>
		</div>
	)
}

export default App