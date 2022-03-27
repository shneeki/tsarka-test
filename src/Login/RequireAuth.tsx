import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthToken } from "./Apollo/useAuthToken";

interface AuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: AuthProps) => {
  const location = useLocation();
  const [getToken] = useAuthToken("refresh-token");

  const isAuth = !!getToken();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
