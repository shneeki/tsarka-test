import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./auth";

interface AuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: AuthProps) => {
  const location = useLocation();
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
