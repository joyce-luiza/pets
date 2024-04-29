import { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar";

export default function AdminMenuSidebar() {
  const [content, setContent] = useState("article");

  return (
    <div>
      <ProfileSidebar content={content} setContent={setContent}>
        <li key={"article"}>
          <i className="ri-article-line ri-xl" />
          <p>Meu cadastro</p>
        </li>
        <li key={"adoptions"}>
          <i className="ri-home-heart-line ri-xl" />
          <p>Adoções</p>
        </li>
        <li key={"home"}>
          <i className="ri-home-2-line ri-xl" />
          <p>Endereço</p>
        </li>
        <li key={"emotion"}>
          <i className="ri-emotion-2-line ri-xl" />
          <p>Preferências</p>
        </li>
        <li key={"lock"}>
          <i className="ri-lock-password-line ri-xl" />
          <p>Alterar senha</p>
        </li>
        <li key={"logout"}>
          <i className="ri-logout-box-line ri-xl" />
          <p>Sair</p>
        </li>
      </ProfileSidebar>
    </div>
  );
}
