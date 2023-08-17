import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'VOTED':
			return `anecdote '${action.message} voted'`;
		case 'NEWCREATED':
			return `new anecdote created '${action.message}'`;
		case 'SHORTANECDOTE':
			return 'anecdote was short, it must be length of 5 character'
		case 'CLEARNOTIFICATION':
			return '';
		default: return state;
	}
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '');

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch] }>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext);
	return notificationAndDispatch[0];
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext);
	return notificationAndDispatch[1];
}

export default NotificationContext;