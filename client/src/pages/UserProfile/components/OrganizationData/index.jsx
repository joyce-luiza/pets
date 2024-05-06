import { React, useState, useEffect } from "react";
import { axiosRequest } from "../../../../utils/axiosRequest";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../utils/Message";
import styles from "./styles.module.css";

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
                        <h2>{orgData.name}</h2>
                        <div className={styles.subtitle}>
                            <div className={styles.cnpj}>
                                <i className="ri-building-line ri-xl"></i>
                                <p className="body1">{orgData.cnpj}</p>
                            </div>
                            <div className={styles.address}>
                                <i className="ri-map-pin-2-line ri-xl"></i>
                                <p className="body1">
                                    {`${address.street}, ${address.number} - ${address.city}-${address.state}`}
                                </p>
                            </div>
                            <p></p>
                        </div>
                    </div>
                    <div>
                        <label>Descrição</label>
                        <p className="body1">{orgData.description}</p>
                    </div>
                    <div className={styles.contact}>
                        <h3>Contato</h3>
                        <div>
                            <div className={styles.contactInfo}>
                                <label>Email</label>
                                <div>
                                    <i class="ri-mail-line  ri-xl"></i>
                                    <p className="body1">{orgData.email}</p>
                                </div>
                            </div>
                            <div className={styles.contactInfo}>
                                <label>Telefone</label>
                                <div>
                                    <i class="ri-phone-line  ri-xl"></i>
                                    <p className="body1">
                                        {orgData.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.installations}>
                        <h3>Instalações</h3>
                        <div>
                            <div className={styles.installationsInfo}>
                                <label>Tipos de animais acolhidos</label>
                                <div>
                                    <p className="body1">Cachorro, gato</p>
                                </div>
                            </div>
                            <div className={styles.installationsInfo}>
                                <label>Capacidade de acomodação</label>
                                <div>
                                    <p className="body1">
                                        80 cachorros, 100 gatos
                                    </p>
                                </div>
                            </div>
                            <div className={styles.installationsInfo}>
                                <label>Horário de funcionamento</label>
                                <div>
                                    <p className="body1">
                                        Seg à Sáb, das 08:00 às 19:00
                                    </p>
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
