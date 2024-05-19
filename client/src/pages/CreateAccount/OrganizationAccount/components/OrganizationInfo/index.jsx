import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import CnpjField from "../../../../../components/CnpjField";
import PhoneNumberField from "../../../../../components/PhoneNumberField";
import styles from "../../styles.module.css";
import { axiosRequest } from "../../../../../utils/axiosRequest";
import showMessage from "../../../../../utils/Message";

const { Title, Paragraph } = Typography;

export default function OrganizationInfo({
    answers,
    updateAnswers,
    prevStep,
    nextStep,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        updateAnswers((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleStepInfo = async () => {
        try {
            setLoading(true);
            await form.validateFields();
            const cnpj = encodeURIComponent(answers.cnpj);
            await axiosRequest({
                method: "get",
                path: `/organization/cnpj/${cnpj}`,
            });
            nextStep();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showMessage("error", error);
        }
    };

    return (
        <>
            <div className={styles.stepFormTitle}>
                <div>
                    <i className="ri-article-line ri-2x"></i>
                    <Title level={3} style={{ margin: 0 }}>
                        Informações gerais
                    </Title>
                </div>
                <Paragraph style={{ margin: "1em 0 2em 0" }}>
                    Por favor, preencha as informações gerais sobre a sua
                    organização abaixo.
                </Paragraph>
            </div>
            <Form
                layout="vertical"
                style={{ width: "100%" }}
                initialValues={answers}
                onValuesChange={(value) => handleChange(value)}
                onFinish={handleStepInfo}
                form={form}
            >
                <Form.Item
                    label="Nome da organização:"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Insira o nome da organização",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Nome da organização" />
                </Form.Item>
                <CnpjField></CnpjField>
                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Insira um email",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Email" />
                </Form.Item>
                <PhoneNumberField></PhoneNumberField>

                <Form.Item
                    label="Descrição:"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Insira uma descrição",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Descrição da organização" />
                </Form.Item>
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
                            loading={loading}
                        >
                            Continuar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
