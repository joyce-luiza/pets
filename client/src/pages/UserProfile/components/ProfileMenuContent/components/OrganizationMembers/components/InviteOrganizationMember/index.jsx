import { React, useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Modal } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";

export default function InviteOrganizationMember({ open, setIsModalOpen }) {
    const [emails, setEmails] = useState([""]);
    const [form] = Form.useForm();

    const handleOk = async () => {
        const body = {
            invites: emails,
        };
        try {
            await axiosRequest({
                method: "post",
                path: "/invite/",
                body,
                authenticated: true,
            });
            form.resetFields();
            setIsModalOpen(false);
            showMessage("success", "Convites enviados com sucesso!");
        } catch (error) {
            showMessage("error", error);
        }
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const updateEmail = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const removeEmail = (index) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setEmails([""]);
        }
    }, [open]);

    return (
        <Modal
            title="Convidar membros"
            open={open}
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
            <Form
                layout="vertical"
                style={{ width: "100%", marginTop: 32 }}
                initialValues={{ emails: emails }}
                form={form}
            >
                <Form.List name="emails">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? "Email:" : ""}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Row>
                                            <Col
                                                span={
                                                    fields.length > 1 ? 23 : 24
                                                }
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={[
                                                        "onChange",
                                                        "onBlur",
                                                    ]}
                                                    rules={[
                                                        {
                                                            type: "email",
                                                            message:
                                                                "Insira um email válido.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        onChange={(e) =>
                                                            updateEmail(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Email"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        size="large"
                                                        data-cy={`organization-invite-${index}`}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={fields.length > 1 ? 1 : 0}
                                            >
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        style={{
                                                            margin: "12px 8px",
                                                        }}
                                                        onClick={() => {
                                                            remove(field.name);
                                                            removeEmail(index);
                                                        }}
                                                    />
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        style={{ width: "100%" }}
                                        data-cy="add-email-button"
                                    >
                                        <PlusOutlined /> Adicionar email
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>
        </Modal>
    );
}
