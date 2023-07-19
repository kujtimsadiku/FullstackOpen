import { useState } from "react"

const Togglable = ({ children, btnName }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{btnName}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	)
}

export default Togglable