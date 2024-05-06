import React from "react";
import styles from "./styles.module.css";

export default function ChooseAccount() {
    return (
        <div className={styles.container}>
            <div className={styles.typeAccountCards}>
                <h2>Criar conta</h2>
                <p className="body1">
                    Selecione qual é o seu perfil para a criação de conta.
                </p>
                <a href="/adopter">
                    <div className={styles.typeAccountCard}>
                        <div>
                            <i className="ri-user-heart-line ri-2x"></i>
                            <h3>Sou adotante</h3>
                        </div>
                        <p className="body1">
                            Desejo procurar, interagir e potencialmente adotar
                            animais de estimação disponíveis para adoção.
                        </p>
                    </div>
                </a>
                <a href="/organization">
                    <div className={styles.typeAccountCard}>
                        <div>
                            <i className="ri-home-heart-line ri-2x"></i>
                            <h3>Sou organização</h3>
                        </div>
                        <p className="body1">
                            Desejo gerenciar animais disponíveis para adoção,
                            coordenar processos de adoção e interagir com
                            potenciais adotantes.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
}
