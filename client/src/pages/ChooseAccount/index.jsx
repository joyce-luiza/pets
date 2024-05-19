import React from "react";
import { Typography } from "antd";
import Link from "../../components/Link";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

export default function ChooseAccount() {
    return (
        <div className={styles.container}>
            <div className={styles.typeAccountCards}>
                <Title level={1} style={{ margin: 0 }}>
                    Criar conta
                </Title>
                <Paragraph>
                    Selecione qual é o seu perfil para a criação de conta.
                </Paragraph>
                <Link href="/adopter">
                    <div className={styles.typeAccountCard}>
                        <div>
                            <i className="ri-user-heart-line ri-2x"></i>
                            <Title
                                level={4}
                                style={{ margin: 0, color: "var(--color01)" }}
                            >
                                Sou adotante
                            </Title>
                        </div>
                        <Paragraph>
                            Desejo procurar, interagir e potencialmente adotar
                            animais de estimação disponíveis para adoção.
                        </Paragraph>
                    </div>
                </Link>
                <Link href="/organization">
                    <div className={styles.typeAccountCard}>
                        <div>
                            <i className="ri-home-heart-line ri-2x"></i>
                            <Title
                                level={4}
                                style={{ margin: 0, color: "var(--color01)" }}
                            >
                                Sou organização
                            </Title>
                        </div>
                        <Paragraph>
                            Desejo gerenciar animais disponíveis para adoção,
                            coordenar processos de adoção e interagir com
                            potenciais adotantes.
                        </Paragraph>
                    </div>
                </Link>
            </div>
        </div>
    );
}
