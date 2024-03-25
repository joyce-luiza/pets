import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const [accountType, setAccountType] = useState(USER_TYPE.ADOPTER);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error,
            duration: 5,
        });
    };

    const changeAccountType = (event) => {
        setAccountType(event.target.value);
    };

    const handleSubmit = async ({ email, password }) => {
        setLoading(true);
        try {
            await login(email, password, accountType, false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            errorMessage(error);
        }
    };

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <section className={styles.login}>
                    <h2 className={styles.title}>Fazer login</h2>

                    <Form
                        layout="vertical"
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item>
                            <div className={styles.accountType}>
                                <h3>Tipo de conta</h3>
                                <Radio.Group
                                    onChange={changeAccountType}
                                    value={accountType}
                                >
                                    <Radio value={USER_TYPE.ADOPTER}>
                                        Sou adotante
                                    </Radio>
                                    <Radio value={USER_TYPE.ORGANIZATION}>
                                        Sou uma organização
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                        {accountType === USER_TYPE.ADOPTER && (
                            <>
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
                                            message:
                                                "Insira um endereço de email",
                                        },
                                    ]}
                                    validateTrigger="onBlur"
                                >
                                    <Input
                                        size="large"
                                        placeholder="Email"
                                    ></Input>
                                </Form.Item>
                                <Form.Item
                                    name={"password"}
                                    label="Senha:"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Insira sua senha",
                                        },
                                    ]}
                                    validateTrigger="onBlur"
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Senha"
                                    ></Input.Password>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        block
                                        size="large"
                                        type="primary"
                                        loading={loading}
                                        htmlType="submit"
                                    >
                                        Fazer login
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="link"
                                        href="/register"
                                        style={{ width: "100%" }}
                                    >
                                        Não possui login? Crie uma conta
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                    {accountType === USER_TYPE.ORGANIZATION && (
                        <h3>Confia que aqui vai ter um formulário</h3>
                    )}
                </section>
            </div>
        </>
    );
}
