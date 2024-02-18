import React, { useState } from "react";
import { Button, Form, Input, Carousel, Radio, message } from "antd";
import styles from "./styles.module.css";
import MaskedInput from "../../components/MaskedInput";
import testimonialImage1 from "./images/image-1.jpg";
import PasswordField from "../../components/PasswordField";
import { axiosRequest } from "../../utils/axiosRequest";
import BirthDateField from "../../components/BirthDateField";

export default function CreateAccount() {
    const [accountType, setAccountType] = useState("adopter");
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const changeAccountType = (event) => {
        setAccountType(event.target.value);
    };

    const successMessage = () => {
        messageApi.open({
            type: "success",
            content: "Conta criada com sucesso!",
            duration: 5,
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: "error",
            content: "Erro ao criar conta.",
            duration: 5,
        });
    };

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
        };

        const result = await axiosRequest({
            method: "post",
            path: "/adopter",
            body,
        });

        if (result) {
            setLoading(false);
            return successMessage();
        } else {
            setLoading(false);
            return errorMessage();
        }
    };

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <section className={styles.createAccount}>
                    <h2 className={styles.title}>Criar conta</h2>

                    {accountType === "adopter" && (
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
                            <Form.Item>
                                <div className={styles.accountType}>
                                    <h3>Tipo de conta</h3>
                                    <Radio.Group
                                        onChange={changeAccountType}
                                        value={accountType}
                                    >
                                        <Radio value={"adopter"}>
                                            Sou adotante
                                        </Radio>
                                        <Radio value={"organization"}>
                                            Sou uma organização
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
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
                                        message: "Insira um endereço de email",
                                    },
                                ]}
                                validateTrigger="onBlur"
                            >
                                <Input size="large" placeholder="Email"></Input>
                            </Form.Item>
                            <MaskedInput
                                name={"phoneNumber"}
                                label="Número de celular:"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira um número de celular",
                                    },
                                ]}
                                type="text"
                                mask="(99) 99999-9999"
                                placeholder="(00) 00000-0000"
                            ></MaskedInput>
                            {/* <DatePicker
                                name={"birthDate"}
                                label="Data de nascimento:"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Insira a sua data de nascimento",
                                    },
                                ]}
                            /> */}
                            <BirthDateField
                                name={"birthDate"}
                                label={"Data de nascimento"}
                            ></BirthDateField>
                            <PasswordField name={"password"}></PasswordField>
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
                            <Form.Item>
                                <Button type="link" style={{ width: "100%" }}>
                                    Já possui conta? Faça login
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    {accountType === "organization" && (
                        <Form
                            layout="vertical"
                            style={{ width: "70%" }}
                            initialValues={""}
                        >
                            <Form.Item>
                                <div className={styles.accountType}>
                                    <h3>Tipo de conta</h3>
                                    <Radio.Group
                                        onChange={changeAccountType}
                                        value={accountType}
                                    >
                                        <Radio value={"adopter"}>
                                            Sou adotante
                                        </Radio>
                                        <Radio value={"organization"}>
                                            Sou uma organização
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <h3>Confia que aqui vai ter um formulário</h3>
                        </Form>
                    )}
                </section>
                <div style={{ position: "fixed", right: "0" }}>
                    <Carousel
                        className={styles.carousel}
                        // autoplay
                    >
                        <div className={styles.banner}>
                            <div
                                style={{
                                    backgroundImage: `url(${testimonialImage1})`,
                                }}
                                className={styles.backgroundPhoto}
                            ></div>
                            <p className={styles.testimonialText}>
                                "Encontrei Teodoro, meu fiel amigo de quatro
                                patas, no site! Ele trouxe alegria e amor para
                                nossa casa. Obrigado, [nome do site]!"
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div></div>
                                <p>Maiara, tutora do Teodoro</p>
                            </div>
                        </div>
                        <div className={styles.banner}>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
