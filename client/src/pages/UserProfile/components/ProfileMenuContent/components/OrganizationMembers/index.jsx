import { React, useState, useEffect } from "react";
import { Typography, Flex, Button, Input, Table, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../utils/Message";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";
import InviteOrganizationMember from "./components/InviteOrganizationMember";
import UpdateOrganizationMemberRole from "./components/UpdateOrganizationMemberRole";
import DeleteOrganizationMember from "./components/DeleteOrganizationMember";
import AdminProtection from "../../../../../../contexts/AdminProtection";
const { Search } = Input;
const { Title, Paragraph } = Typography;

export default function OrganizationMembers({ user }) {
    const [loading, setLoading] = useState(true);

    const [members, setMembers] = useState();
    const [selectedMember, setSelectedMember] = useState(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showInviteModal = () => {
        setIsInviteModalOpen(true);
    };

    const handleEditMember = (item) => {
        setSelectedMember(item);
        setIsRoleModalOpen(true);
    };

    const handleDeleteMember = (item) => {
        setSelectedMember(item);
        setIsDeleteModalOpen(true);
    };

    const getOrgMembers = async () => {
        setLoading(true);
        try {
            const result = await axiosRequest({
                method: "get",
                path: `/member/organization/${user.organizationId}`,
                authenticated: true,
            });

            const filteredMembers = result.filter(
                (item) => item.id !== user.id
            );

            const orgMembers = filteredMembers.map((item) => ({
                ...item,
                actions: (
                    <AdminProtection>
                        <div className={styles.tableRowActions}>
                            <Tooltip title="Editar">
                                <Button
                                    size="middle"
                                    type="link"
                                    onClick={() => handleEditMember(item)}
                                >
                                    <i className="ri-edit-line"></i>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Excluir">
                                <Button
                                    size="middle"
                                    type="link"
                                    onClick={() => handleDeleteMember(item)}
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </Button>
                            </Tooltip>
                        </div>
                    </AdminProtection>
                ),
            }));
            setMembers(orgMembers);
            setLoading(false);
        } catch (error) {
            showMessage("error", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrgMembers();
    }, [user.organizationId]);

    const columns = [
        {
            title: "Nome",
            dataIndex: "firstName",
            key: "fullName",
            width: 200,
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Número de telefone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: 200,
        },

        {
            title: "Permissão",
            dataIndex: "role",
            key: "role",
            width: 130,
        },
        {
            title: "",
            dataIndex: "actions",
            key: "actions",
            width: 100,
        },
    ];

    return !loading ? (
        <div className={styles.container}>
            <div className={styles.content}>
                <Title level={2} style={{ margin: 0, textAlign: "left" }}>
                    Equipe
                </Title>
                <Flex justify="space-between">
                    <Search
                        className={styles.searchInput}
                        placeholder="Pesquise pelo nome do membro"
                        loading={false}
                        style={{ width: "30%" }}
                    />
                    <AdminProtection>
                        <Button
                            size="middle"
                            type="primary"
                            onClick={showInviteModal}
                            data-cy="invite-organization-member-button"
                        >
                            Convidar membros
                        </Button>
                    </AdminProtection>
                </Flex>
                <section
                    className={styles.tableData}
                    style={{ minWidth: "max-content" }}
                >
                    <Table
                        dataSource={members}
                        pagination={{ total: 47 }}
                        rowClassName={styles.tableRow}
                        headerClassName={styles.headerRow}
                    >
                        {columns.length &&
                            columns.map(({ title, key, dataIndex, width }) => {
                                let renderFunction;
                                if (key === "fullName") {
                                    renderFunction = (text, record) =>
                                        `${record.firstName} ${record.lastName}`;
                                }
                                return (
                                    <Column
                                        title={
                                            <span
                                                className={
                                                    styles.tableColumnTitle
                                                }
                                            >
                                                {title}
                                            </span>
                                        }
                                        dataIndex={dataIndex}
                                        key={key}
                                        width={width}
                                        render={renderFunction}
                                    />
                                );
                            })}
                    </Table>
                </section>
            </div>

            <InviteOrganizationMember
                open={isInviteModalOpen}
                setIsModalOpen={setIsInviteModalOpen}
            />
            <UpdateOrganizationMemberRole
                open={isRoleModalOpen}
                setIsModalOpen={setIsRoleModalOpen}
                member={selectedMember}
                updateMembers={getOrgMembers}
            />
            <DeleteOrganizationMember
                open={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                member={selectedMember}
                updateMembers={getOrgMembers}
            />
        </div>
    ) : (
        <Paragraph>Carregando...</Paragraph>
    );
}
