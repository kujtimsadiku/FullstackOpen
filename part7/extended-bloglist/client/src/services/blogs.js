import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  const updated = {
    ...response.data,
    user: newObject.user,
  };
  return updated;
};

const remove = async (id) => {
  const response = await axios.delete(`/api/blogs/${id}`);
  console.log("here is the request of axios.delete", response.data);
  return response.data;
};

export const blogService = { getAll, create, update, setToken, remove };