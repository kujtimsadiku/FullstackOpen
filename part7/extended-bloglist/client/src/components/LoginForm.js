import { useDispatch } from "react-redux";
import { logIn } from "../reducers/loginReducer";
import { useField } from "../hooks";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("Password");

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(logIn({ username: username.value, password: password.value }));
    username.reset();
    password.reset();
  };

  return (
    <div className="login-container">
      <Notification />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            id="username"
            {...username.inputProps}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            id="password"
            {...password.inputProps}
            placeholder="Password"
          />
        </div>
        <div>
          <button className="login" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
