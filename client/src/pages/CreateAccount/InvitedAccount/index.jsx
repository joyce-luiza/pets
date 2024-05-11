import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../../constants";
import PasswordField from "../../../components/PasswordField";
import { axiosRequest } from "../../../utils/axiosRequest";
import BirthDateField from "../../../components/BirthDateField";
import { useAuth } from "../../../contexts/AuthContext";
import showMessage from "../../../utils/Message";
import PhoneNumberField from "../../../components/PhoneNumberField";
import ErrorImg from "./undraw_Taken_re_yn20.png";

export default function InvitedAccount() {
    useEffect(() => {
        const validateToken = async () => {
            try {
                const result = await axiosRequest({
                    method: "get",
                    path: `/invite/token/${encodeURIComponent(token)}`,
                });
                setOrganizationId(result);
                setLoading(false);
            } catch (error) {
                showMessage("error", error);
                setError(error);
                setLoading(false);
            }
        };
        validateToken();
    });

    const { token } = useParams();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [organizationId, setOrganizationId] = useState();
    const [error, setError] = useState();

    const handleSubmit = async ({
        fullName,
        birthDate,
        password,
        phoneNumber,
        email,
    }) => {
        setLoading(true);
        const firstName = fullName.split(" ")[0];
        const lastName = fullName.slice(firstName.length).trim();
        const body = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            role: "DEFAULT",
            organizationId: organizationId,
        };

        try {
            const result = await axiosRequest({
                method: "post",
                path: "/member",
                body,
            });
            const { email, password } = result;
            await login(email, password, USER_TYPE.ORGANIZATION, false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showMessage("error", error);
        }
    };

    return (
        <>
            {!error ? (
                <div className={styles.container}>
                    <section className={styles.createAccount}>
                        <h2 className={styles.title}>Criar conta</h2>

                        <Form
                            layout="vertical"
                            style={{ width: "70%" }}
                            initialValues={{
                                fullName: "",
                                email: "",
                                phoneNumber: "",
                                birthDate: "",
                                password: "",
                            }}
                            onFinish={handleSubmit}
                        >
                            <>
                                <Form.Item
                                    name={"fullName"}
                                    label="Nome completo:"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Insira o seu nome completo",
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Nome completo"
                                    ></Input>
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
                                <PhoneNumberField></PhoneNumberField>
                                <BirthDateField></BirthDateField>
                                <PasswordField
                                    name={"password"}
                                ></PasswordField>
                                <Form.Item>
                                    <Button
                                        block
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Criar conta
                                    </Button>
                                </Form.Item>
                            </>
                        </Form>
                    </section>
                </div>
            ) : (
                <div className={styles.errorMessage}>
                    <h2>{error}</h2>
                    <p>
                        Parece que este convite não é mais válido. Isso pode
                        ocorrer caso você já tenha aceito um convite
                        anteriormente. Por favor, entre em contato com o
                        administrador da sua organização.
                    </p>
                    <img style={{ height: "60vh" }} src={ErrorImg} />
                </div>
            )}
        </>
    );
}
