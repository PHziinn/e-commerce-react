import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ requiredRole }) => {
  const { signed, user } = useContext(AuthContext);

  const role = user?.role || null;

  if (!signed) {
    return <Navigate to="/" />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
