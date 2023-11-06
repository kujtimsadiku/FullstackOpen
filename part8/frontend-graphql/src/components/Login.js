import React from "react";
import LoginForm from "./LoginForm";

const Login = (props) => {
  if (!props.show) return null;

  return (
    <div>
      <LoginForm show={props.show} />
    </div>
  );
};

export default Login;
