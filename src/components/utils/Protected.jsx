import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const authToken = window.localStorage.getItem("authToken");

  if (!authToken | (authToken === null)) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
