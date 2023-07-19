const LoginForm = ({
	handleSubmit,
	handleUsername,
	handlePassword,
	username,
	password
}) => {
	return (
		<div>
			<h2>Log in to application</h2>

			<form onSubmit={handleSubmit}>
				<div>
					Username
					<input 
						value={username}
						onChange={handleUsername}
					/>
				</div>
				<div>
					Password
					<input style={{margin: "3.5px"}}
						value={password}
						onChange={handlePassword}
						type="Password"
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginForm