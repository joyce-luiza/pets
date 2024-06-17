import { React, useState, useEffect } from "react";
import { Form, Input, Button, Typography, Flex } from "antd";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import BirthDateField from "../../../../../../components/BirthDateField";
import "remixicon/fonts/remixicon.css";
import showMessage from "../../../../../../utils/Message";
import dayjs from "dayjs";
import PhoneNumberField from "../../../../../../components/PhoneNumberField";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../../../../../constants";
import DeleteAccount from "./components/DeleteAccount";

const { Title } = Typography;

export default function UserData({ user }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
                <Flex justify="space-between" align="center">
                    <Title level={2} style={{ margin: 0, textAlign: "left" }}>
                        Meus dados
                    </Title>

                    <Button
                        icon={<i class="ri-delete-bin-line"></i>}
                        type="default"
                        onClick={() => setIsDeleteModalOpen(true)}
                        data-cy="delete-adopter-button"
                    >
                        Excluir conta
                    </Button>
                </Flex>
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
                        <Input
                            size="large"
                            placeholder="Nome completo"
                            data-cy="adopter-fullname"
                        />
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
                        <Input
                            size="large"
                            placeholder="Email"
                            data-cy="adopter-email"
                        />
                    </Form.Item>
                    <PhoneNumberField data-cy="adopter-phone-number" />
                    <BirthDateField data-cy="adopter-birth-date" />
                    <Form.Item>
                        <Button
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            data-cy="update-adopter-button"
                        >
                            Editar dados
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <DeleteAccount
                user={user}
                open={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
            ></DeleteAccount>
        </div>
    );
}
