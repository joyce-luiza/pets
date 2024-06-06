import { React, useState, useEffect } from "react";
import { Typography, Flex, Space, Button } from "antd";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../../../utils/Message";
import styles from "./styles.module.css";
import UpdateOrganizationData from "./components/UpdateOrganizationData";
import DeleteOrganization from "./components/DeleteOrganization";
import AdminProtection from "../../../../../../contexts/AdminProtection";

const { Title, Paragraph } = Typography;

export default function OrganizationData({ user }) {
    const [orgData, setOrgData] = useState();
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(true);

    const [editOrganization, setEditOrganization] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        <div className={styles.container}>
            {!editOrganization ? (
                !loading ? (
                    <div className={styles.orgInfo}>
                        <Flex justify="space-between" align="center">
                            <Title level={1} style={{ margin: 0 }}>
                                {orgData.name}
                            </Title>
                            <Flex gap={32}>
                                <AdminProtection>
                                    <Button
                                        icon={<i class="ri-edit-line"></i>}
                                        type="default"
                                        onClick={() =>
                                            setEditOrganization(true)
                                        }
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        icon={
                                            <i class="ri-delete-bin-line"></i>
                                        }
                                        type="default"
                                        onClick={() =>
                                            setIsDeleteModalOpen(true)
                                        }
                                    >
                                        Deletar
                                    </Button>
                                </AdminProtection>
                            </Flex>
                        </Flex>
                        <Space size={24} style={{ marginTop: 24 }}>
                            <Flex gap={48} style={{ marginBottom: 48 }}>
                                <Flex gap="middle" align="center">
                                    <i className="ri-building-line ri-xl"></i>
                                    <Paragraph style={{ margin: 0 }}>
                                        {orgData.cnpj}
                                    </Paragraph>
                                </Flex>
                                <Flex gap="middle" align="center">
                                    <i className="ri-map-pin-2-line ri-xl"></i>
                                    <Paragraph style={{ margin: 0 }}>
                                        {`${address.street}, ${address.number} - ${address.city}-${address.state}`}
                                    </Paragraph>
                                </Flex>
                            </Flex>
                        </Space>
                        <Space size={48} direction="vertical">
                            <Flex vertical>
                                <Title level={3}>Descrição</Title>
                                <Paragraph style={{ margin: 0 }}>
                                    {orgData.description}
                                </Paragraph>
                            </Flex>
                            <Flex vertical>
                                <Title level={3}>Contato</Title>
                                <Flex gap={48}>
                                    <Flex gap={12} vertical>
                                        <label>Email</label>
                                        <Flex gap={12} align="center">
                                            <i class="ri-mail-line  ri-xl"></i>
                                            <Paragraph style={{ margin: 0 }}>
                                                {orgData.email}
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                    <Flex gap={12} vertical>
                                        <label>Telefone</label>
                                        <Flex gap={12} align="center">
                                            <i class="ri-phone-line  ri-xl"></i>
                                            <Paragraph style={{ margin: 0 }}>
                                                {orgData.phoneNumber}
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex vertical>
                                <Title level={3} style={{ marginBottom: 24 }}>
                                    Instalações
                                </Title>
                                <Flex gap={48}>
                                    <Flex gap={12} vertical>
                                        <label>
                                            Tipos de animais acolhidos
                                        </label>
                                        <Paragraph style={{ margin: 0 }}>
                                            Cachorro, gato
                                        </Paragraph>
                                    </Flex>
                                    <Flex gap={12} vertical>
                                        <label>Capacidade de acomodação</label>
                                        <Paragraph style={{ margin: 0 }}>
                                            80 cachorros, 100 gatos
                                        </Paragraph>
                                    </Flex>
                                    <Flex gap={12} vertical>
                                        <label>Horário de funcionamento</label>
                                        <Paragraph style={{ margin: 0 }}>
                                            Seg à Sáb, das 08:00 às 19:00
                                        </Paragraph>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Space>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )
            ) : (
                <UpdateOrganizationData
                    setEditOrganization={setEditOrganization}
                    orgData={orgData}
                    setOrgData={setOrgData}
                    address={address}
                    setAddress={setAddress}
                />
            )}
            <DeleteOrganization
                organizationData={orgData}
                open={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
            ></DeleteOrganization>
        </div>
    );
}
