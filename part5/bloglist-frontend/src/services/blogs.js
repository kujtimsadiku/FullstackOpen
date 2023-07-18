import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
}


const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject);

  return request.then(response => response.data);
}

const remove = (id) => {
	const request = axios.delete(`/api/blogs/${id}`)
	console.log('here is the request of axios.delete', request);
	return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, remove }