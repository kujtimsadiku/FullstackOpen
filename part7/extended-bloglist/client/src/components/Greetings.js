import { useSelector } from "react-redux";

const Greetings = () => {
  const userLogged = useSelector((state) => state.login);

  return <p className="logged-in">{userLogged.name} logged in</p>;
};

export default Greetings;
