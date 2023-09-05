import { useSelector } from "react-redux";

const Greetings = () => {
  const userLogged = useSelector((state) => state.login);

  return <p>{userLogged.name}</p>;
};

export default Greetings;
