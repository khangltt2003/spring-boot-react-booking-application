import React from "react";
import { useContext } from "react";
import AuthContext from "./provider/auth-provider";
import { Navigate, Outlet } from "react-router";

export const AdminRoute = () => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin()) {
    return <div className="h-full w-full">You don't have permission to access this page.</div>;
  }

  return <Outlet />;
};
