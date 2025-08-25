import React from "react";

// router
import { Navigate } from "react-router-dom";
import { get_cookie } from "../../config/cookie";

type IPrivateProps = {
  children: React.ReactNode;
};

const PrivateRoute: any = ({ children }: IPrivateProps) => {
  if (!get_cookie("@serial")) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
