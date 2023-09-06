import { useSelector } from "react-redux";

const Greetings = () => {
  const userLogged = useSelector((state) => state.login);

  return (
    <p className="greetings">
      <i class="bx bxs-user"></i>
      {userLogged.name} logged in
    </p>
  );
};

export default Greetings;
