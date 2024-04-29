import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import UserData from "./components/UserData.jsx";
import ChangePassword from "./components/ChangePassword";
import ProfileSidebar from "../../components/ProfileSidebar/index.jsx";

export default function UserProfile() {
  const { user } = useAuth();
  const [content, setContent] = useState("userData");

  const renderContent = () => {
    switch (content) {
      case "userData":
        return <UserData user={user} />;
      case "adoptions":
        // Componente de adoções
        break;
      case "address":
        // Componente de endereço
        break;
      case "preferences":
        // Componente de preferências
        break;
      case "password":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <ProfileSidebar content={content} setContent={setContent}>
        <li key={"userData"}>
          <i className="ri-article-line ri-xl"></i>
          <p>Meu cadastro</p>
        </li>
        <li key={"adoptions"}>
          <i className="ri-home-heart-line ri-xl"></i>
          <p>Adoções</p>
        </li>
        <li key={"address"}>
          <i className="ri-home-2-line ri-xl"></i>
          <p>Endereço</p>
        </li>
        <li key={"preferences"}>
          <i className="ri-emotion-2-line ri-xl"></i>
          <p>Preferências</p>
        </li>
        <li key={"password"}>
          <i className="ri-lock-password-line ri-xl"></i>
          <p>Alterar senha</p>
        </li>
        <li key={"logout"}>
          <i className="ri-logout-box-line ri-xl"></i>
          <p>Sair</p>
        </li>
      </ProfileSidebar>

      {renderContent()}
    </div>
  );
}
