import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'VOTED':
			console.log(action.message);
			return `anecdote '${action.message} voted'`;
		case 'NEWCREATED':
			return `new anecdote created '${action.message}'`;
		case 'SHORTANECDOTE':
			return state
		default: return state;
	}
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '');

	return (
		<NotificationContext.Provider value={ [notification, notificationDispatch] }>
			{props.chilren}
		</NotificationContext.Provider>
	)
}

export default NotificationContext;