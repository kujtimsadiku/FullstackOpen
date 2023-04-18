import '../index.css'

const Notification = ({ message, error }) => {
	if (message === null)
		return null
	if (error)
		return (
			<div className='deleted'>
				{message}
			</div>
		)
	else
		return (
			<div className='added'>
				{message}
			</div>
		)
}

export default Notification