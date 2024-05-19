import React from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import styles from "../../styles.module.css";

const { Title, Paragraph } = Typography;

export default function Team({ emails, setEmails, prevStep, finishForm }) {
    const [form] = Form.useForm();

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

    return (
        <>
            <div className={styles.stepFormTitle}>
                <div>
                    <i className="ri-group-line ri-2x"></i>
                    <Title level={3} style={{ margin: 0 }}>
                        Equipe (Opcional)
                    </Title>
                </div>
                <Paragraph style={{ margin: "1em 0 2em 0" }}>
                    Caso necessário, você pode conceder acesso aos outros
                    integrantes da equipe da organização. Basta inserir o email
                    de cada um, e um convite será enviado.
                </Paragraph>
            </div>

            <Form
                name="dynamic_form_item"
                initialValues={{ emails: emails }}
                layout="vertical"
                form={form}
                onFinish={finishForm}
                style={{ width: "100%" }}
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
                                    >
                                        <PlusOutlined /> Adicionar email
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <div className={styles.callToAction}>
                    <Form.Item>
                        <Button
                            style={{ color: `var(--color01)` }}
                            type="secondary"
                            size="large"
                            icon={<i class="ri-arrow-left-line"></i>}
                            onClick={prevStep}
                        >
                            Voltar
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ width: "100%" }}>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            size="large"
                            htmlType="submit"
                        >
                            Finalizar cadastro
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
