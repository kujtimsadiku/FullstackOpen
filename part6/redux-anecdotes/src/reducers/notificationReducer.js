import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: 'List of anecdotes:',
	reducers: {
		renderNotification(state, action) {
			return action.payload
		},
		resetNotification(state) {
			return 'List of anecdotes:';
		},
		clearNotification(state) {
			return '';
		},
	}
})

export const { renderNotification, clearNotification, resetNotification } = notificationSlice.actions

// showNotificationWithTimeout takes a message and duration for the message to been shown.
// (dispatch) => this part returns another function
// no need to use useDispatch since redux has a middleware that provides dispatch to your thunk function
// when its called from somewhere else example dispatch(showNotificationWithTimeout(something), 5000)
export const showNotificationWithTimeout = (message, duration) => (dispatch) => {
	dispatch(renderNotification(message));
	setTimeout(() => {
		dispatch(resetNotification())
	}, duration)
}

export default notificationSlice.reducer