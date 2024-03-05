import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();
    const userData = JSON.parse(user);
    return userData && userData.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
