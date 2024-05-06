import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import PhoneNumberField from "../../../../../components/PhoneNumberField";
import BirthDateField from "../../../../../components/BirthDateField";
import PasswordField from "../../../../../components/PasswordField";
import styles from "../../styles.module.css";
import { axiosRequest } from "../../../../../utils/axiosRequest";
import showMessage from "../../../../../utils/Message";

export default function AdminUser({ answers, updateAnswers, nextStep }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        updateAnswers((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleStepInfo = async () => {
        const firstName = answers.fullName.split(" ")[0];
        const lastName = answers.fullName.slice(firstName.length).trim();
        updateAnswers((prev) => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
        }));
        setLoading(true);
        try {
            await form.validateFields();
            await axiosRequest({
                method: "get",
                path: `/member/email/${answers.email}`,
            });
            setLoading(false);
            nextStep();
        } catch (error) {
            showMessage("error", error);
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.stepFormTitle}>
                <div>
                    <i className="ri-admin-line ri-2x"></i>
                    <h2 className="headline4">Administrador</h2>
                </div>
                <p className="body1">
                    É necessário informar um usuário administrador responsável
                    pelo acesso ao perfil da organização.
                </p>
            </div>
            <Form
                layout="vertical"
                style={{ width: "100%" }}
                initialValues={answers}
                onFinish={handleStepInfo}
                onValuesChange={(value) => handleChange(value)}
                form={form}
            >
                <>
                    <Form.Item
                        name={"fullName"}
                        label="Nome completo:"
                        rules={[
                            {
                                required: true,
                                message: "Insira o seu nome completo",
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Nome completo"></Input>
                    </Form.Item>
                    <Form.Item
                        name={"email"}
                        label="Email:"
                        rules={[
                            {
                                type: "email",
                                message:
                                    "O email inserido não possui um formato válido.",
                            },
                            {
                                required: true,
                                message: "Insira um endereço de email",
                            },
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input size="large" placeholder="Email"></Input>
                    </Form.Item>
                    <PhoneNumberField></PhoneNumberField>
                    <BirthDateField></BirthDateField>
                    <PasswordField name={"password"}></PasswordField>

                    <Form.Item style={{ width: "100%" }}>
                        <Button
                            style={{ width: "100%" }}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Continuar
                        </Button>
                    </Form.Item>
                </>
            </Form>
        </>
    );
}
