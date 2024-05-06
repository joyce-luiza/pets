import { React } from "react";
import styles from "./styles.module.css";
import "remixicon/fonts/remixicon.css";
import { USER_TYPE } from "../../../../constants";

export default function ProfileSidebar({ content, setContent, userType }) {
    switch (userType) {
        case USER_TYPE.ADOPTER:
            return (
                <div className={styles.sidebar}>
                    <ul>
                        <li className={styles.photo}></li>
                        <li
                            className={
                                content === "userData"
                                    ? `${styles.sidebarItem} ${styles.active}`
                                    : styles.sidebarItem
                            }
                            onClick={() => setContent("userData")}
                        >
                            <i className="ri-article-line ri-xl"></i>Meu
                            cadastro
                        </li>
                        <li className={styles.sidebarItem}>
                            <i className="ri-home-heart-line ri-xl"></i>Adoções
                        </li>
                        <li className={styles.sidebarItem}>
                            <i className="ri-home-2-line ri-xl"></i>Endereço
                        </li>
                        <li className={styles.sidebarItem}>
                            <i className="ri-emotion-2-line ri-xl"></i>
                            Preferências
                        </li>
                        <li
                            className={
                                content === "password"
                                    ? `${styles.sidebarItem} ${styles.active}`
                                    : styles.sidebarItem
                            }
                            onClick={() => setContent("password")}
                        >
                            <i className="ri-lock-password-line ri-xl"></i>
                            Alterar senha
                        </li>
                        <li className={styles.sidebarItem}>
                            <i className="ri-logout-box-line ri-xl"></i>Sair
                        </li>
                    </ul>
                </div>
            );
        case USER_TYPE.ORGANIZATION:
            return (
                <div className={styles.sidebar}>
                    <ul>
                        <li className={styles.photo}></li>
                        <li
                            className={
                                content === "organizationData"
                                    ? `${styles.sidebarItem} ${styles.active}`
                                    : styles.sidebarItem
                            }
                            onClick={() => setContent("organizationData")}
                        >
                            <i class="ri-community-line ri-xl"></i>Organização
                        </li>
                        <li
                            className={
                                content === "userData"
                                    ? `${styles.sidebarItem} ${styles.active}`
                                    : styles.sidebarItem
                            }
                            onClick={() => setContent("userData")}
                        >
                            <i className="ri-article-line ri-xl"></i>Meu
                            cadastro
                        </li>

                        <li
                            className={
                                content === "password"
                                    ? `${styles.sidebarItem} ${styles.active}`
                                    : styles.sidebarItem
                            }
                            onClick={() => setContent("password")}
                        >
                            <i className="ri-lock-password-line ri-xl"></i>
                            Alterar senha
                        </li>
                        <li className={styles.sidebarItem}>
                            <i className="ri-logout-box-line ri-xl"></i>Sair
                        </li>
                    </ul>
                </div>
            );
        default:
            break;
    }
}
