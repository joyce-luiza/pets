import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
    const { user } = useAuth();
    const userData = JSON.parse(user);
    return (
        <div style={{ marginTop: "15%" }}>
            <p>{`Olá, ${userData.firstName}`}</p>
            <p>{`Email: ${userData.email}`}</p>
        </div>
    );
}
