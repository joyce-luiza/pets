import { React, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { axiosRequest } from "../../../../utils/axiosRequest";
import MaskedInput from "../../../../components/MaskedInput";
import BirthDateField from "../../../../components/BirthDateField";
import "remixicon/fonts/remixicon.css";
import dayjs from "dayjs";

export default function UserData({ user }) {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    const getUserData = async () => {
        const result = await axiosRequest({
            method: "get",
            path: `/adopter/${user.id}`,
        });
        const { birthDate, firstName, lastName } = result;
        setUserData({
            ...result,
            fullName: `${firstName} ${lastName}`,
            birthDate: dayjs(birthDate),
        });
        setLoading(true);
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {loading ? (
                <div>
                    <h2>Meu cadastro</h2>
                    <Form layout="vertical" initialValues={userData}>
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
                        <BirthDateField
                            name={"birthDate"}
                            label={"Data de nascimento"}
                        ></BirthDateField>
                        <Form.Item>
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Alterar dados
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    );
}
