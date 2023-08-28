import PropTypes from "prop-types";

const Notification = ({ message, errorMessage }) => {
  if (
    (message === null || message === undefined) &&
    (errorMessage === null || errorMessage === undefined)
  )
    return null;

  if (message !== null && message !== undefined) {
    return <div className="success-message">{message}</div>;
  } else if (errorMessage !== null && errorMessage !== undefined) {
    return <div className="error-message">{errorMessage}</div>;
  }
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Notification;
