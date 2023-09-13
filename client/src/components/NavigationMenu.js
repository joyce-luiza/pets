import React from "react";
import Button from "./Button";
import Link from "./Link";
import "./styles/NavigationMenu.css";

const NavigationMenu = () => {
    return (
        <nav className="navigation-menu">
            <div className="menu-logo">
                <img src="caminho-para-sua-logo.png" alt="Logo" />
            </div>
            <div className="menu-links">
                <ul className="menu-items">
                    <li className="menu-item">
                        <Link>Organizações de contato</Link>
                    </li>
                    <li className="menu-item">
                        <Link>Adoção</Link>
                    </li>
                    <li className="menu-item">
                        <Link>Contato</Link>
                    </li>
                </ul>
                <div className="divider"></div>
                <div className="menu-ctas">
                    <Link>Fazer login</Link>
                    <Link href="/createaccount">
                        <Button
                            text="Criar conta"
                            styleType={"default"}
                            size={"small"}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMenu;
