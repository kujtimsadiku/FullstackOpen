import { createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUser(users));
  };
};

export default userSlice.reducer;
