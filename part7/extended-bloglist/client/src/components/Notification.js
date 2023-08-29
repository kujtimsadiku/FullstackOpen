import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) {
    return null;
  }

  if (notification.state === "success") {
    return <div className="success-message">{notification.message}</div>;
  } else {
    return <div className="error-message">{notification.message}</div>;
  }
};

export default Notification;
