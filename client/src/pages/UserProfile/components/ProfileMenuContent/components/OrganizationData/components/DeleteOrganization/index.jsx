import { React } from "react";
import { useAuth } from "../../../../../../../../contexts/AuthContext";
import { Form, Modal, Typography, Input, Button } from "antd";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";

const { Paragraph } = Typography;

export default function DeleteOrganization({
    organizationData,
    open,
    setIsModalOpen,
}) {
    const { logout } = useAuth();

    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (values.name !== organizationData.name) {
                return;
            }
            await axiosRequest({
                method: "DELETE",
                path: `/organization/${organizationData.id}`,
                authenticated: true,
            });
            setIsModalOpen(false);
            logout();
        } catch (error) {
            if (!error.values) {
                showMessage("error", error);
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Deletar organização?"
            open={open}
            cancelText={"Cancelar"}
            okText={"Deletar"}
            footer={[
                <Button
                    key="cancel"
                    onClick={handleCancel}
                    data-cy="modal-cancel-button"
                >
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    data-cy="modal-submit-button"
                    onClick={handleOk}
                >
                    Deletar
                </Button>,
            ]}
        >
            <div style={{ margin: "24px 0" }}>
                {open && (
                    <>
                        <Paragraph>
                            Tem certeza que deseja deletar a organização{" "}
                            {organizationData.name}?
                        </Paragraph>
                        <Paragraph>
                            Ao deletar a organização, todos os animais e membros
                            cadastrados serão inativados. Além disso, não será
                            possível utilizar nenhuma funcionalidade de
                            gerenciamento, não permitindo mais acesso ao perfil
                            da organização.
                        </Paragraph>
                        <Paragraph>
                            Para prosseguir com a ação, digite o nome da
                            organização.
                        </Paragraph>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                label="Confirme o nome da organização:"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Confirme o nome da organização",
                                    },
                                    {
                                        validator: (_, value) =>
                                            value &&
                                            value !== organizationData.name
                                                ? Promise.reject(
                                                      "O nome da organização está incorreto"
                                                  )
                                                : Promise.resolve(),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Nome da organização"
                                    data-cy="confirm-organization-name"
                                />
                            </Form.Item>
                        </Form>
                    </>
                )}
            </div>
        </Modal>
    );
}
