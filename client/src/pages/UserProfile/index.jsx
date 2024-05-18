import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AdopterProfile from "./AdopterProfile";
import ProfileSidebar from "./components/ProfileSidebar/index.jsx";
import styles from "./styles.module.css";
import OrganizationProfile from "./OrganizationProfile/index.jsx";
import { USER_TYPE } from "../../constants.js";

export default function UserProfile() {
    const { user } = useAuth();
    const [content, setContent] = useState("userData");
    return (
        <div className={styles.container}>
            <ProfileSidebar
                content={content}
                setContent={setContent}
                userType={user.type}
            />

            {user.type === USER_TYPE.ADOPTER ? (
                <AdopterProfile content={content} user={user} />
            ) : (
                ""
            )}
            {user.type === USER_TYPE.ORGANIZATION ? (
                <OrganizationProfile content={content} user={user} />
            ) : (
                ""
            )}
        </div>
    );
}
