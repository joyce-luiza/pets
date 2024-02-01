import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import styles from "./styles.module.css";
import MaskedInput from "../../components/MaskedInput";
import DatePicker from "../../components/DatePicker";

export default function CreateAccount() {
    const [userProfile, setUserProfile] = useState({
        nomeCompleto: "",
        email: "",
        numeroCelular: "",
        dataNascimento: "",
        senha: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log({ ...userProfile });
    };

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
        <div className={styles.container}>
            <section className={styles.createAccount}>
                <h2 className={styles.title}>Criar conta</h2>
                <Form
                    layout="vertical"
                    style={{ width: "70%" }}
                    initialValues={userProfile}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Nome completo:"
                        rules={[
                            {
                                required: true,
                                message: "Insira seu nome completo.",
                            },
                        ]}
                    >
                        <Input
                            name={"nomeCompleto"}
                            size="large"
                            placeholder="Nome completo"
                            value={userProfile.nomeCompleto}
                            onChange={handleChange}
                        ></Input>
                    </Form.Item>
                    <Form.Item
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
                    >
                        <Input
                            name={"email"}
                            size="large"
                            placeholder="Email"
                            value={userProfile.email}
                            onChange={handleChange}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Número de celular:">
                        <MaskedInput
                            name={"numeroCelular"}
                            value={userProfile.numeroCelular}
                            onChange={handleChange}
                            type="text"
                            mask="(99) 99999-9999"
                            placeholder="(00) 00000-0000"
                        ></MaskedInput>
                    </Form.Item>
                    <Form.Item label="Data de nascimento:">
                        <DatePicker
                            name="dataNascimento"
                            selected={userProfile.dataNascimento}
                            handleChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Senha:"
                        rules={[
                            {
                                required: true,
                                message: "Insira uma senha.",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Senha"
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                            name={"senha"}
                            value={userProfile.senha}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            Criar conta
                        </Button>
                    </Form.Item>
                </Form>
            </section>
            <section className={styles.banner}></section>
        </div>
    );
}
