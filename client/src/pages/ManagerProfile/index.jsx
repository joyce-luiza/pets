// import { useState } from "react";
// import ProfileSidebar from "../../components/ProfileSidebar";
// import styles from "./styles.module.css";

// import OrganizationAnimals from "./components/OrganizationAnimals";

// export default function AdminProfile() {
//   const [content, setContent] = useState("Dashboard");

//   return (
//     <div className={styles.container}>
//       <div className={styles.gridContainer}>
//         <ProfileSidebar
//           className={styles.sidebar}
//           content={content}
//           setContent={setContent}
//         >
//           <li key={"Dashboard"}>
//             <i className="ri-bar-chart-box-line ri-xl"></i>
//             <p>Dashboard</p>
//           </li>
//           <li key={"Organização"}>
//             <i className="ri-community-line ri-xl"></i>
//             <p>Organização</p>
//           </li>
//           <li key={"Adoções"}>
//             <i className="ri-home-heart-line ri-xl"></i>
//             <p>Adoções</p>
//           </li>
//           <li key={"Animais"}>
//             <i className="ri-empathize-line ri-xl"></i>
//             <p>Animais</p>
//           </li>
//           <li key={"Visitas"}>
//             <i className="ri-calendar-event-line ri-xl"></i>
//             <p>Visitas</p>
//           </li>
//           <li key={"Equipe"}>
//             <i className="ri-group-line ri-xl"></i>
//             <p>Equipe</p>
//           </li>
//           <li key={"Meus dados"}>
//             <i className="ri-article-line ri-xl"></i>
//             <p>Meus dados</p>
//           </li>
//           <li key={"Alterar senha"}>
//             <i className="ri-lock-password-line ri-xl" />
//             <p>Alterar senha</p>
//           </li>
//           <li key={"logout"}>
//             <i className="ri-logout-box-line ri-xl" />
//             <p>Sair</p>
//           </li>
//         </ProfileSidebar>

//         {content === "Animais" && <OrganizationAnimals />}
//       </div>
//     </div>
//   );
// }
