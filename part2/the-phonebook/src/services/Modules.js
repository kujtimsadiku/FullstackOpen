import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	console.log(request)
	return request.then(response => response.data)
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	console.log('here is the request of axios.delete', request);
	return request.then(response => response.data)
}

const phoneService = {
	getAll: getAll, 
	create: create,
	update: update,
	remove: remove
}

export default phoneService