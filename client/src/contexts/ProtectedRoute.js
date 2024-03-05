import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();

    console.log("1. o user é" + user + " com o tipo " + typeof user);
    const outroUser = JSON.parse(user);
    console.log("2. o outro user é" + outroUser);
    console.log(
        "2. o outro user é" + outroUser + " com o tipo " + typeof outroUser
    );
    console.log("3. o token é: " + outroUser?.token);

    return outroUser && outroUser.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
