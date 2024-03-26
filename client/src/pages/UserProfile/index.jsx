import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProfileSidebar from "./components/ProfileSidebar";
import styles from "./styles.module.css";
import UserData from "./components/UserData.jsx";
import ChangePassword from "./components/ChangePassword";

export default function UserProfile() {
    const { user } = useAuth();
    const [content, setContent] = useState("userData");
    return (
        <div className={styles.container}>
            <ProfileSidebar content={content} setContent={setContent} />
            {content === "userData" && <UserData user={user} />}
            {content === "password" && <ChangePassword />}
        </div>
    );
}
