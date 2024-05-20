import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../constants.js";
import AdminSidebar from "./components/AdminSidebar/index.jsx";
import AdopterSidebar from "./components/AdopterSidebar/index.jsx";
import ProfileMenuContent from "./components/ProfileMenuContent/index.jsx";

export default function UserProfile() {
    const { user } = useAuth();
    const [content, setContent] = useState(
        user.type === USER_TYPE.ORGANIZATION ? "Dashboard" : "MyData"
    );
    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                {user.type === USER_TYPE.ORGANIZATION ? (
                    <>
                        <AdminSidebar
                            className={styles.sidebar}
                            content={content}
                            setContent={setContent}
                        ></AdminSidebar>
                    </>
                ) : (
                    <AdopterSidebar
                        className={styles.sidebar}
                        content={content}
                        setContent={setContent}
                    ></AdopterSidebar>
                )}

                <ProfileMenuContent content={content} />
            </div>
        </div>
    );
}
