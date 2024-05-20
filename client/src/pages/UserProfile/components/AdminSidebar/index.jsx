import React from "react";
import ProfileSidebar from "../../../../components/ProfileSidebar/index.jsx";

export default function AdminSidebar({ setContent, content }) {
  return (
    <ProfileSidebar content={content} setContent={setContent} isAdopter={false}>
      <li key={"Dashboard"}>
        <i className="ri-bar-chart-box-line ri-xl"></i>
        <p>Dashboard</p>
      </li>
      <li key={"Organization"}>
        <i className="ri-community-line ri-xl"></i>
        <p>Organização</p>
      </li>
      <li key={"Adoptions"}>
        <i className="ri-home-heart-line ri-xl"></i>
        <p>Adoções</p>
      </li>
      <li key={"Animals"}>
        <i className="ri-empathize-line ri-xl"></i>
        <p>Animais</p>
      </li>
      <li key={"Visits"}>
        <i className="ri-calendar-event-line ri-xl"></i>
        <p>Visitas</p>
      </li>
      <li key={"Team"}>
        <i className="ri-group-line ri-xl"></i>
        <p>Equipe</p>
      </li>
      <li key={"MyData"}>
        <i className="ri-article-line ri-xl"></i>
        <p>Meus dados</p>
      </li>
      <li key={"ChangePassword"}>
        <i className="ri-lock-password-line ri-xl" />
        <p>Alterar senha</p>
      </li>
      <li key={"Logout"}>
        <i className="ri-logout-box-line ri-xl" />
        <p>Sair</p>
      </li>
    </ProfileSidebar>
  );
}
