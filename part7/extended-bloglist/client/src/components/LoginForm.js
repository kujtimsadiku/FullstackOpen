import { useDispatch } from "react-redux";
import { logIn } from "../reducers/loginReducer";
import { useField } from "../hooks";

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
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input id="username" {...username.inputProps} />
        </div>
        <div>
          Password
          <input
            style={{ margin: "3.5px" }}
            id="password"
            {...password.inputProps}
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
