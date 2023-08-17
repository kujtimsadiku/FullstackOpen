import { createContext, useReducer, useContext } from 'react'
import { useRef, useState } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'VOTED':
			return `anecdote '${action.message} voted'`;
		case 'NEWCREATED':
			return `new anecdote created '${action.message}'`;
		case 'SHORTANECDOTE':
			return 'too short anecdote, must have length 5 or more'
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

export const useNotificationDispatchWithTimeout = () => {
	const dispatch = useNotificationDispatch();
	const timeoutIdRef = useRef(null);
	const [resetTriggered, setResetTriggered] = useState(null);

	const showNotificationWithTimeout = (type, message, duration) => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		} 

		if (message === null)
			dispatch({ type:type })
		else
			dispatch({ type: type, message: message});

		timeoutIdRef.current = setTimeout(() => {
			dispatch({ type: 'CLEARNOTIFICATION' })
			setResetTriggered(false);
		}, duration * 1000);

		if (!resetTriggered) {
			setResetTriggered(true);
			timeoutIdRef.current = setTimeout(() => {
				setResetTriggered(false);
			}, duration * 1000);
		}
		
		return timeoutIdRef.current;
	}

	return showNotificationWithTimeout
}

export default NotificationContext;