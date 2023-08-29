import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/register";

const userSlice = createSlice({
  name: "usernmae",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
