import React from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/Logo.png";
import Link from "../../components/Link";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "antd";

export default function Header() {
    const { user, logout } = useAuth();
    return (
        <header className={styles.container}>
            <img className={styles.menuLogo} src={Logo} alt="Logo" />
            <div className={styles.menuLinks}>
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
                {user && user.token ? (
                    <>
                        <Link>{`Olá, ${user.firstName} `}</Link>
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
