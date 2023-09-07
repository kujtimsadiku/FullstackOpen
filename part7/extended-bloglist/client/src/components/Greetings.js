import { useSelector } from "react-redux";

const Greetings = () => {
  const userLogged = useSelector((state) => state.login);

  return (
    <p className="greetings">
      {userLogged.name} is logged in
    </p>
  );
};

export default Greetings;
