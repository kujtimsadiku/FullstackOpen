import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = () => token;

const getLocalStorageUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;

    return user;
  }
  return null;
};

const setLocalStorageUser = (user) => {
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  token = user.token;
};

const clearLocalStorageUser = () => {
  window.localStorage.clear("loggedBlogappUser");
  token = null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export const userService = {
  register,
  getAll,
  getToken,
  setToken,
  getLocalStorageUser,
  clearLocalStorageUser,
  setLocalStorageUser,
};
