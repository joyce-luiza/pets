import { React, useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import Link from "../../components/Link";
import { USER_TYPE } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { axiosRequest } from "../../utils/axiosRequest";
import showMessage from "../../utils/Message";

export default function Header() {
    const { user, logout } = useAuth();
    const [orgName, setOrgName] = useState();

    useEffect(() => {
        const getOrgData = async () => {
            if (user && user.type === USER_TYPE.ORGANIZATION) {
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
    }, []);

    return (
        <header className={styles.container}>
            <Link href="/">
                <img className={styles.menuLogo} src={logo} alt="Logo" />
            </Link>
            <div className={styles.menuLinks}>
                {(user.type === USER_TYPE.ADOPTER ||
                    user.type === undefined) && (
                    <>
                        <ul className={styles.menuItems}>
                            <li className={styles.menuItem}>
                                <Button
                                    type="link"
                                    href="/"
                                    size="large"
                                    className={styles.linkButton}
                                >
                                    Organizações de contato
                                </Button>
                            </li>
                            <li className={styles.menuItem}>
                                <Button
                                    type="link"
                                    href="/"
                                    size="large"
                                    className={styles.linkButton}
                                >
                                    Adoção
                                </Button>
                            </li>
                            <li className={styles.menuItem}>
                                <Button
                                    type="link"
                                    href="/"
                                    size="large"
                                    className={styles.linkButton}
                                >
                                    Contato
                                </Button>
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
                        <Button
                            type="link"
                            href="/profile"
                            size="large"
                            className={styles.linkButton}
                        >
                            {`Olá, ${user.firstName} `}
                        </Button>

                        <Button type="link" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <div className={styles.menuAccount}>
                        <Button
                            type="link"
                            href="/login"
                            data-cy="login-button"
                            size="large"
                            className={styles.linkButton}
                        >
                            Fazer login
                        </Button>
                        <Button
                            type="primary"
                            data-cy="create-account-button"
                            href="/register"
                            size="large"
                        >
                            Criar conta
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
