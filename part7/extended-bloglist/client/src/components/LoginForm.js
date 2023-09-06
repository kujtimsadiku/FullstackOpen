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
    // <div className="flex justify-center">
    <div className="wrapper">
      <Notification />
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            id="username"
            {...username.inputProps}
            placeholder="Username"
            required
          />
          <i class="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            id="password"
            {...password.inputProps}
            placeholder="Password"
            required
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <div className="register-link">
          <p>
            Dont' have an account? <a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
