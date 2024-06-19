import React from "react";
import { USER_ROLE } from "../constants";
import { useAuth } from "./AuthContext";

const AdminProtection = ({ children }) => {
    const { user } = useAuth();

    if (user.role !== USER_ROLE.ADMIN) {
        return null;
    }

    return <>{children}</>;
};

export default AdminProtection;
