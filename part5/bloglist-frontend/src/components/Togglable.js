import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef(({ children, btnName }, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{btnName}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
			</div>
		</div>
	)
})

export default Togglable