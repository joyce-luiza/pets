import React from "react";
import ProfileSidebar from "../../../../components/ProfileSidebar/index.jsx";

export default function AdopterSidebar({ setContent, content }) {
  return (
    <ProfileSidebar content={content} setContent={setContent}>
      <li key={"MyData"}>
        <i className="ri-article-line ri-xl"></i>
        <p>Meu cadastro</p>
      </li>
      <li key={"Adoptions"}>
        <i className="ri-home-heart-line ri-xl"></i>
        <p>Adoções</p>
      </li>
      <li key={"Address"}>
        <i className="ri-home-2-line ri-xl"></i>
        <p>Endereço</p>
      </li>
      <li key={"Preferences"}>
        <i className="ri-emotion-2-line ri-xl"></i>
        <p>Preferências</p>
      </li>
      <li key={"Lifestyle"}>
        <i className="ri-open-arm-line ri-xl"></i>
        <p>Lifestyle</p>
      </li>
      <li key={"ChangePassword"}>
        <i className="ri-lock-password-line ri-xl"></i>
        <p>Alterar senha</p>
      </li>
      <li key={"Logout"}>
        <i className="ri-logout-box-line ri-xl"></i>
        <p>Sair</p>
      </li>
    </ProfileSidebar>
  );
}
