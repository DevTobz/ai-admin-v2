import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// auth and pages
import AuthRoutes from "./routes";

// components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import PrivateRoute from "./private";

export interface IApplicationProps {}

const MainNavigation: React.FC<IApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AuthRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigation;
