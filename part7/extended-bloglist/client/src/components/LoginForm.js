import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/loginReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(logIn({ username: username, password: password }));
    setUsername("");
    setPassword("");
    console.log("Logging in with", username, password);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            style={{ margin: "3.5px" }}
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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

export default LoginForm;
