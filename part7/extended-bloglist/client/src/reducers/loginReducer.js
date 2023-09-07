import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "../services/login";
import { userService } from "../services/users";
import { showNotificationWithTimeout } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const userToBeLogged = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });
      userService.setLocalStorageUser(userToBeLogged);
      dispatch(login(userToBeLogged));
    } catch (exception) {
      dispatch(showNotificationWithTimeout("Wrong credentials", "error", 3));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    userService.clearLocalStorageUser();
    dispatch(logout(null)); 
  };
};

export default loginSlice.reducer;
