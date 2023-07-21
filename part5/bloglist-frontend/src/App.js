import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs =>
				setBlogs(blogs)
		)
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, [])

	// method cancels the event if it cancelable, meaning that the default action that belongs to event will not occur
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username, password
			});
			
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			);

			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
		}
		console.log('Logging in with', username, password);
	}

	const logOut = () => {
		window.localStorage.clear('loggedBlogappUser');
		setUser(null);
	}

	const loggedIn = (username) => {
		return (
			<div>
				<div className='loggedIn'>
					{username} is logged in
					<button onClick={logOut} className='loggedOut-btn'>Logout</button>
				</div>
			</div>
		);
	}

	const handleBlog = async (newBlog) => {
		try {
			const blog = await blogService.create(newBlog);

			// Fetch the updated list of blogs from the server
			const updatedBlogs = await blogService.getAll();
			setBlogs([...updatedBlogs, blog]);

			setMessage(`A new blog ${blog.title} by ${blog.author}`);
			setTimeout(() => {
				setMessage(null);
			}, 3000	)
		} catch (exception) {
			setErrorMessage("error");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000)
		}
	}

	// Deletes a blog 
	// const deleteBlog = async (id, event) => {
	// 	event.preventDefault();

	// 	try {
	// 		await blogService.remove(id)
	// 		setBlogs(blogs.filter(blog => blog.id !== id))
	// 	} catch (exception) {
	// 		console.log(exception);
	// 	}
	// }

	return (
		<div>
				{!user && 
					<Togglable btnName="Login">
						<LoginForm
							username={username}
							password={password}
							handleUsername={({ target }) => setUsername(target.value)}
							handlePassword={({ target }) => setPassword(target.value)}
							handleSubmit={handleLogin}
							/>
					</Togglable>
				}
				{user && 
				<div>
					<h2>Blogs</h2>
					{loggedIn(username)}
					<Notification message={message} errorMessage={errorMessage}/>
					<Togglable btnName="Create Blog">
						<BlogForm
							createBlog={handleBlog}
						/>
						{blogs.map((blog) => {
							if (blog.user && blog.user.username && blog.user.username === user.username) {
								return <Blog key={blog.id} blog={blog} />;
							} else {
								return null;
							}
						})}
					</Togglable>
				</div>
				}
		</div>
	)
}

export default App