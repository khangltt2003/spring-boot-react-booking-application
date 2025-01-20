import React from "react";
import { useContext } from "react";
import AuthContext from "./provider/auth-provider";
import { Navigate, Outlet, useNavigate } from "react-router";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default PrivateRoute;
