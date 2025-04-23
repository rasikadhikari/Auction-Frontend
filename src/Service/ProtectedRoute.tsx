import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  email: string;
  exp: number;
}

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      sessionStorage.clear();
      return <Navigate to="/user/login" replace />;
    }

    if (allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/notauthorize" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    sessionStorage.clear();
    return <Navigate to="/user/login" replace />;
  }
};

export default ProtectedRoute;
