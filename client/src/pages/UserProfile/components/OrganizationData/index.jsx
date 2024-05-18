import { React, useState, useEffect } from "react";
import { Typography } from "antd";
import { axiosRequest } from "../../../../utils/axiosRequest";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../utils/Message";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

export default function OrganizationData({ user }) {
    const [orgData, setOrgData] = useState();
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrgData = async () => {
            setLoading(true);
            try {
                const org = await axiosRequest({
                    method: "get",
                    path: `/organization/${user.organizationId}`,
                });
                const address = await axiosRequest({
                    method: "get",
                    path: `/organization/complement/${user.organizationId}`,
                });
                setOrgData(org);
                setAddress(address);
                setLoading(false);
            } catch (error) {
                showMessage("error", error);
                setLoading(false);
            }
        };

        getOrgData();
    }, [user.organizationId]);

    return (
        <>
            {!loading ? (
                <div className={styles.orgInfo}>
                    <div className={styles.header}>
                        <Title level={1}>{orgData.name}</Title>
                        <div className={styles.subtitle}>
                            <div className={styles.cnpj}>
                                <i className="ri-building-line ri-xl"></i>
                                <Paragraph style={{ margin: 0 }}>
                                    {orgData.cnpj}
                                </Paragraph>
                            </div>
                            <div className={styles.address}>
                                <i className="ri-map-pin-2-line ri-xl"></i>
                                <Paragraph style={{ margin: 0 }}>
                                    {`${address.street}, ${address.number} - ${address.city}-${address.state}`}
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Title level={3}>Descrição</Title>
                        <Paragraph>{orgData.description}</Paragraph>
                    </div>
                    <div className={styles.contact}>
                        <Title level={3}>Contato</Title>
                        <div>
                            <div className={styles.contactInfo}>
                                <label>Email</label>
                                <div>
                                    <i class="ri-mail-line  ri-xl"></i>
                                    <Paragraph style={{ margin: 0 }}>
                                        {orgData.email}
                                    </Paragraph>
                                </div>
                            </div>
                            <div className={styles.contactInfo}>
                                <label>Telefone</label>
                                <div>
                                    <i class="ri-phone-line  ri-xl"></i>
                                    <Paragraph style={{ margin: 0 }}>
                                        {orgData.phoneNumber}
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.installations}>
                        <Title level={3}>Instalações</Title>
                        <div>
                            <div className={styles.installationsInfo}>
                                <label>Tipos de animais acolhidos</label>
                                <div>
                                    <Paragraph style={{ margin: 0 }}>
                                        Cachorro, gato
                                    </Paragraph>
                                </div>
                            </div>
                            <div className={styles.installationsInfo}>
                                <label>Capacidade de acomodação</label>
                                <div>
                                    <Paragraph style={{ margin: 0 }}>
                                        80 cachorros, 100 gatos
                                    </Paragraph>
                                </div>
                            </div>
                            <div className={styles.installationsInfo}>
                                <label>Horário de funcionamento</label>
                                <div>
                                    <Paragraph style={{ margin: 0 }}>
                                        Seg à Sáb, das 08:00 às 19:00
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    );
}
