import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/UserApi";

const AdminProtector = ({ children }) => {
  const authToken = window.localStorage.getItem("authToken");
  const { data: UserData } = useQuery({
    queryKey: ["UserData"],
    queryFn: () => getUser(authToken),
  });

  if (UserData && !UserData.role | (authToken.role === "admin")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

AdminProtector.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtector;
