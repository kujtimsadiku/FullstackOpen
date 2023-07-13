import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
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
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password
			});
			
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			);

			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
		console.log('Logging in with', username, password);
	}

	const setTheUser = (value) => {
		console.log(value);
		return setUsername(value);
	}

	const login = () => {
		return (
				<div>
						<h2>Log in to application</h2>
						<form onSubmit={handleLogin}>
							<div>
								Username
								<input 
								type="text"
								value={username}
								name="Username"
								onChange={({ target }) => setTheUser(target.value)}
								/>
							</div>
							<div>
								Password
								<input style={{margin: "3.5px"}}
								type="password"
								value={password}
								name="Password"
								onChange={({ target }) => setPassword(target.value)}
								/>
							</div>
							<button type="submit">Login</button>
						</form>
				</div>
		);
	}

	const loggedIn = (username) => {
		return (
			<div>
				<div 
					style={{fontWeight: "bold", margin: "0px 0px 20px 0px"}}>
					{username} is logged in
					<button style={{margin: "0px 0px 0px 3px"}}>Logout</button>
				</div>
			</div>
		);
	}

	const blogForm = (user) => {
		return (
			<div>
				<h1>Blogs</h1>
				{loggedIn(user.username)}
				{blogs.map((blog) => {
					if (blog.user && blog.user.username && blog.user.username === user.username) {
						return <Blog key={blog.id} blog={blog} />;
					} else {
						return null;
					}
				})}
			</div>
		);
	};

	return (
		<div>
				<Notification message={errorMessage} />
				{!user && login()}
				{user && blogForm(user)}
		</div>
	)
}

export default App