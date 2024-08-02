import PropTypes from "prop-types";

const Notification = ({ message, variant }) => {
  if (message === null) {
    return null;
  }

  return <div className={variant}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Notification;
