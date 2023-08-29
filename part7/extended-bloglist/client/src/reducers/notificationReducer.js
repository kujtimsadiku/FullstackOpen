import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    resetNotification() {
      return null;
    },
    showNotification(state, action) {
      return action.payload;
    },
  },
});

let timeoutId;

export const showNotificationWithTimeout = (message, type, duration) => {
  return (dispatch) => {
    clearTimeout(timeoutId);

    dispatch(
      showNotification({
        message: message,
        state: type,
      }),
    );

    timeoutId = setTimeout(() => {
      dispatch(resetNotification());
    }, duration * 1000);
  };
};

export const { resetNotification, showNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
