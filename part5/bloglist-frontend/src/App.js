import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newBlog, setNewBlog] = useState({title: "", author: "", url: ""})

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

	const setTheUser = (value) => {
		console.log(value);
		return setUsername(value);
	}

	const login = () => {
		return (
				<div>
						<h2>Log in to application</h2>
						<Notification errorMessage={errorMessage}/>
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

	const logOut = () => {
		window.localStorage.clear('loggedBlogappUser');
		setUser(null);
		setNewBlog({title: "", author: "", url: ""});
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

	const createBlog = async (event) => {
		event.preventDefault();

		const {title, author, url} = newBlog;

		try {
			const blog = await blogService.create({
				title,
				author,
				url,
				likes: 0
			});

			// Fetch the updated list of blogs from the server
			const updatedBlogs = await blogService.getAll();
			setBlogs([...updatedBlogs, blog]);

			setMessage(`A new blog ${blog.title} by ${blog.author}`);
			setTimeout(() => {
				setMessage(null);
			}, 3000	)
			setNewBlog({title: "", author: "", url: ""});
		} catch (exception) {
			setErrorMessage("error");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000)
		}
	}

	const blogInputHandler = (event) => {
		event.preventDefault();

		const { name, value } = event.target;

		setNewBlog({ ...newBlog, [name]: value});
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

	const blogForm = (user) => {
		return (
			<div>
				<h1>Blogs</h1>
				{loggedIn(user.username)}
				<div>
					<Notification message={message} errorMessage={errorMessage}/>
					<h2>Create new</h2>
					<form onSubmit={createBlog}>
						<div className="blog-form">
							title: 
							<input
								name="title"
								type="text"
								value={newBlog.title}
								onChange={blogInputHandler}/>
						</div>
						<div>
							author: 
							<input
								name="author"
								type="text"
								value={newBlog.author}
								onChange={blogInputHandler}
							/>
						</div>
						<div>
							url
							<input
								name="url"
								type="text"
								value={newBlog.url}
								onChange={blogInputHandler}
							/>
						</div>
						<button className="create-btn" type="submit">Create</button>
					</form>
					{blogs.map((blog) => {
					if (blog.user && blog.user.username && blog.user.username === user.username) {
						return <Blog key={blog.id} blog={blog} />;
					} else {
						return null;
					}
				})}
				</div>
			</div>
		);
	};

	return (
		<div>
				{!user && login()}
				{user && blogForm(user)}
		</div>
	)
}

export default App