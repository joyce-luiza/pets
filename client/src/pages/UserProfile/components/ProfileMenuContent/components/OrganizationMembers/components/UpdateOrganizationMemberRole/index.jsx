import { React, useState, useEffect } from "react";
import { Form, Radio, Modal, Typography } from "antd";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";
import { USER_ROLE } from "../../../../../../../../constants";
const { Paragraph } = Typography;

export default function UpdateOrganizationMemberRole({
    member,
    open,
    setIsModalOpen,
    updateMembers,
}) {
    const [newRole, setNewRole] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        if (member) {
            form.setFieldsValue(member);
        }
    }, [member, form]);

    const handleOk = async () => {
        const body = {
            id: member.id,
            role: newRole,
        };
        try {
            await axiosRequest({
                method: "put",
                path: "/member/role",
                body,
                authenticated: true,
            });
            await updateMembers();
            form.resetFields();
            setIsModalOpen(false);
            showMessage("success", "Permissão do usuário editada com sucesso!");
        } catch (error) {
            showMessage("error", error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Editar permissão"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={"Cancelar"}
            okText={"Editar"}
        >
            <Form
                layout="vertical"
                style={{ width: "100%", marginTop: 32 }}
                form={form}
                onFinish={handleOk}
            >
                <Form.Item
                    name="role"
                    rules={[{ required: true, message: "Selecione um role" }]}
                >
                    <Radio.Group onChange={(e) => setNewRole(e.target.value)}>
                        <Radio value={USER_ROLE.ADMIN}>Admin</Radio>
                        <Paragraph style={{ marginTop: 8, marginBottom: 24 }}>
                            Além de poder gerenciar animais, adoções e os
                            membros da organização, um admin pode editar as
                            informações da organização ou desativá-la.
                        </Paragraph>
                        <Radio value={USER_ROLE.DEFAULT}>Default</Radio>
                        <Paragraph style={{ marginTop: 8, marginBottom: 24 }}>
                            Usuários com a permissão default podem apenas
                            gerenciar animais e adoções.
                        </Paragraph>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
}
