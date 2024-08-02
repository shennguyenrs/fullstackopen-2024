import PropTypes from 'prop-types';

const Notification = ({ message, variant }) => {
  if (message === null) {
    return null;
  }

  return <p className={variant}>{message}</p>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Notification;
