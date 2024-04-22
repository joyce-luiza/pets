import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import CnpjField from "../../../../components/CnpjField";
import PhoneNumberField from "../../../../components/PhoneNumberField";
import styles from "../../styles.module.css";

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
            nextStep();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.stepFormTitle}>
                <div>
                    <i className="ri-article-line ri-2x"></i>
                    <h2 className="headline4">Informações gerais</h2>
                </div>
                <p className="body1">
                    Por favor, preencha as informações gerais sobre a sua
                    organização abaixo.
                </p>
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
                    <Input
                        //onChange={(e) => handleChange({ name: e.target.value })}
                        size="large"
                        placeholder="Nome da organização"
                    />
                </Form.Item>
                <CnpjField
                //onChange={(e) => handleChange({ cnpj: e.target.value })}
                ></CnpjField>
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
                    <Input
                        // onChange={(e) =>
                        //     handleChange({ email: e.target.value })
                        // }
                        size="large"
                        placeholder="Email"
                    />
                </Form.Item>
                <PhoneNumberField
                // onChange={(e) =>
                //     handleChange({ phoneNumber: e.target.value })
                // }
                ></PhoneNumberField>

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
                    <Input.TextArea
                        // onChange={(e) =>
                        //     handleChange({ description: e.target.value })
                        // }
                        placeholder="Descrição da organização"
                    />
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
