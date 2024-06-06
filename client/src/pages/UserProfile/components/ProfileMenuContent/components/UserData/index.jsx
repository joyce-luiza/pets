import { React, useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import BirthDateField from "../../../../../../components/BirthDateField";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../../../utils/Message";
import dayjs from "dayjs";
import PhoneNumberField from "../../../../../../components/PhoneNumberField";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../../../../../constants";

const { Title } = Typography;

export default function UserData({ user }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const updateUserData = async ({
        fullName,
        birthDate,
        phoneNumber,
        email,
    }) => {
        setLoading(true);
        const firstName = fullName.split(" ")[0];
        const lastName = fullName.slice(firstName.length).trim();
        const body = {
            firstName,
            lastName,
            birthDate,
            email,
            phoneNumber,
        };
        try {
            const path = user.type === USER_TYPE.ADOPTER ? "adopter" : "member";
            await axiosRequest({
                method: "put",
                path: `/${path}/`,
                body,
                authenticated: true,
            });

            showMessage("success", "Dados editados com sucesso!");
            await getUserData();
        } catch (error) {
            showMessage("error", error);
        } finally {
            setLoading(false);
        }
    };

    const getUserData = async () => {
        setLoading(true);
        const path = user.type === USER_TYPE.ADOPTER ? "adopter" : "member";
        try {
            const result = await axiosRequest({
                method: "get",
                path: `/${path}/${user.id}`,
            });
            const { birthDate, firstName, lastName } = result;
            const userData = {
                ...result,
                fullName: `${firstName} ${lastName}`,
                birthDate: dayjs(birthDate),
            };
            form.setFieldsValue(userData);
        } catch (error) {
            showMessage("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, [user.id]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Title level={1} style={{ margin: 0 }}>
                    Meus dados
                </Title>
                <Form layout="vertical" form={form} onFinish={updateUserData}>
                    <Form.Item
                        name="fullName"
                        label="Nome completo:"
                        rules={[
                            {
                                required: true,
                                message: "Insira o seu nome completo",
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Nome completo" />
                    </Form.Item>
                    <Form.Item
                        name="email"
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
                        <Input size="large" placeholder="Email" />
                    </Form.Item>
                    <PhoneNumberField name="phoneNumber" />
                    <BirthDateField name="birthDate" />
                    <Form.Item>
                        <Button
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Editar dados
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
