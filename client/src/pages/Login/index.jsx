import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Typography } from "antd";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import showMessage from "../../utils/Message";

const { Title } = Typography;

export default function Login() {
    const [accountType, setAccountType] = useState(USER_TYPE.ADOPTER);
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();

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
            showMessage("error", error);
        }
    };

    useEffect(() => {
        if (user.type && user.token) {
            const doLogin = async () => {
                await login(null, null, user.type, false, user.token);
            };

            doLogin();
        }
    }, []);

    return (
        <>
            <div className={styles.container}>
                <section className={styles.login}>
                    <Title level={2}>Fazer login</Title>
                    <Form
                        layout="vertical"
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item data-cy="login-account-type">
                            <div className={styles.accountType}>
                                <Title level={5}>Tipo de conta</Title>
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
                            data-cy="login-email"
                        >
                            <Input size="large" placeholder="Email"></Input>
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
                            data-cy="login-password"
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
                                data-cy="do-login-button"
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
                    </Form>
                </section>
            </div>
        </>
    );
}
