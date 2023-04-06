/*
	This component that is created is not very effecient. 
	its better ofc to use <h1></h1>

	But in the name of LEARNING i want to learn.

	Headers can return any element with text.
*/
const Headers = ({ text, tag }) => {
	const Htag = tag
	return (
		<Htag>{text}</Htag>
	)
}

export default Headers