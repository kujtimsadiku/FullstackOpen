import axios from "axios";
import { blogService } from "./blogs";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = () => token;

const getLocalStorageUser = (storage) => {
  const loggedUserJSON = window.localStorage.getItem(storage);

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;

    return user;
  }
};

const clearLocalStorageUser = () => {
  window.localStorage.clear("loggedBlogappUser");
  blogService.setToken(null);
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
};
