import { React } from "react";
import { useAuth } from "../../../../../../../../contexts/AuthContext";
import { Form, Modal, Typography, Input, Button } from "antd";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import { USER_TYPE } from "../../../../../../../../constants";
import showMessage from "../../../../../../../../utils/Message";

const { Paragraph } = Typography;

export default function DeleteAccount({ user, open, setIsModalOpen }) {
    const { logout } = useAuth();

    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (values.email !== user.email) {
                return;
            }

            const path = user.type === USER_TYPE.ADOPTER ? "adopter" : "member";

            await axiosRequest({
                method: "DELETE",
                path: `/${path}/${user.id}`,
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
            title="Deletar conta?"
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
                            Tem certeza que deseja deletar a conta?
                        </Paragraph>
                        <Paragraph>
                            Ao deletar a conta, você perderá acesso a todos os
                            seus dados cadastrados.
                        </Paragraph>
                        <Paragraph>
                            Para prosseguir com a ação, digite o seu email.
                        </Paragraph>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                label="Confirme o seu email:"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Confirme o seu email",
                                    },
                                    {
                                        validator: (_, value) =>
                                            value && value !== user.email
                                                ? Promise.reject(
                                                      "O email não corresponde ao email cadastrado."
                                                  )
                                                : Promise.resolve(),
                                    },
                                ]}
                                data-cy="adopter-confirm-email"
                            >
                                <Input size="large" placeholder="Email" />
                            </Form.Item>
                        </Form>
                    </>
                )}
            </div>
        </Modal>
    );
}
