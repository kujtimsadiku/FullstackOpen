import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		message: 'List of anecdotes:',
		timeoutId: null
	},
	reducers: {
		renderNotification(state, action) {
			return {
				message: action.payload.message,
				timeoutId: action.payload.timeoutId
			}
		},
		resetNotification(state) {
			return {
				message: 'List of anecdotes:',
				timeoutId: null
			}
		},
		clearNotification(state) {
			return {
				message: '',
				timeoutId: null
			}
		},
	}
})

export const { renderNotification, clearNotification, resetNotification } = notificationSlice.actions

// showNotificationWithTimeout takes a message and duration for the message to been shown.
// (dispatch) => this part returns another function
// no need to use useDispatch since redux has a middleware that provides dispatch to your thunk function
// when its called from somewhere else example dispatch(showNotificationWithTimeout(something), 5000)
export const showNotificationWithTimeout = (message, duration) => (dispatch, getState) => {
	const state = getState();
	const { notification } = state;

	// we dont want to spam the vote and create a lot of timeouts executions.
	// thats why we clear the previous timeout if there is one that didnt manage to execute yet.
	if (notification.timeoutId)
		clearTimeout(notification.timeoutId)

	const timeoutId = setTimeout(() => {
		console.log('Message timeoutId:', timeoutId);
		dispatch(resetNotification())
	}, duration * 1000)

	dispatch(renderNotification({ message, timeoutId }));
}

export default notificationSlice.reducer