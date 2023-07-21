const LoginForm = ({
	handleSubmit,
	handleUsername,
	handlePassword,
	username,
	password
}) => {
	return (
		<div>
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