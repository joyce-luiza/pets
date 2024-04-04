import { React, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { axiosRequest } from "../../../../utils/axiosRequest";
import MaskedInput from "../../../../components/MaskedInput";
import BirthDateField from "../../../../components/BirthDateField";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../utils/Message";
import dayjs from "dayjs";
import PhoneNumberField from "../../../../components/PhoneNumberField";

export default function UserData({ user }) {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    const getUserData = async () => {
        setLoading(true);
        try {
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
        } catch (error) {
            showMessage("error", error);
        }
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
                        <PhoneNumberField></PhoneNumberField>
                        <BirthDateField></BirthDateField>
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
