import PropTypes from "prop-types";

const LoginForm = ({
  handleSubmit,
  handleUsername,
  handlePassword,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input id="username" value={username} onChange={handleUsername} />
        </div>
        <div>
          Password
          <input
            style={{ margin: "3.5px" }}
            id="password"
            value={password}
            onChange={handlePassword}
            type="Password"
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
