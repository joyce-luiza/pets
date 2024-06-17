import { React, useEffect, useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/Logo.png";
import Link from "../../components/Link";
import { USER_TYPE } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { axiosRequest } from "../../utils/axiosRequest";
import showMessage from "../../utils/Message";
import { Button } from "antd";

export default function Header() {
  const { user, logout } = useAuth();
  const [orgName, setOrgName] = useState();

  useEffect(() => {
    const getOrgData = async () => {
      if (user.type === USER_TYPE.ORGANIZATION) {
        try {
          const org = await axiosRequest({
            method: "get",
            path: `/organization/${user.organizationId}`,
          });
          setOrgName(org.name);
        } catch (error) {
          showMessage("error", error);
        }
      }
    };
    getOrgData();
  }, [user.organizationId]);

  return (
    <header className={styles.container}>
      <Link href="/">
        <img className={styles.menuLogo} src={Logo} alt="Logo" />
      </Link>
      <div className={styles.menuLinks}>
        {(user.type === USER_TYPE.ADOPTER || user.type === undefined) && (
          <>
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                <Link href="/">Organizações de contato</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/">Adoção</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/">Contato</Link>
              </li>
            </ul>
            <div className={styles.divider}></div>
          </>
        )}
        {user.type === USER_TYPE.ORGANIZATION && (
          <>
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>{orgName}</li>
            </ul>
            <div className={styles.divider}></div>
          </>
        )}

        {user && user.token ? (
          <>
            <Link href="/profile">{`Olá, ${user.firstName} `}</Link>

            <Button type="text" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <div className={styles.menuAccount}>
            <Link href="/login">Fazer login</Link>
            <button className={styles.registerBtn}>
              <Link href="/register">Criar conta</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
