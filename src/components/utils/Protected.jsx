import PropTypes from "prop-types";

const Protected = ({ children }) => {
  return children;
};

PropTypes.Protected = {
  children: PropTypes.element.isRequired,
};

export default Protected;
