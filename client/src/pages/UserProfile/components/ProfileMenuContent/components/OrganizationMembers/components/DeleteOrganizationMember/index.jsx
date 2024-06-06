import { React, useState, useEffect } from "react";
import { Form, Modal, Typography, Flex } from "antd";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";
const { Paragraph } = Typography;

export default function DeleteOrganizationMember({
    member,
    open,
    setIsModalOpen,
    updateMembers,
}) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (member) {
            form.setFieldsValue(member);
        }
    }, [member, form]);

    const handleOk = async () => {
        try {
            await axiosRequest({
                method: "delete",
                path: `/member/${member.id}`,
                authenticated: true,
            });
            await updateMembers();
            setIsModalOpen(false);
            showMessage("success", "Usuário deletado com sucesso!");
        } catch (error) {
            showMessage("error", error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Deletar usuário?"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={"Cancelar"}
            okText={"Deletar"}
        >
            {open && (
                <Flex style={{ margin: "24px 0" }} vertical>
                    <Paragraph>
                        Nome: {member.firstName} {member.lastName}
                    </Paragraph>
                    <Paragraph>Email: {member.email}</Paragraph>
                </Flex>
            )}
        </Modal>
    );
}
