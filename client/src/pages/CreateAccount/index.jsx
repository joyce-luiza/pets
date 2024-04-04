import React, { useState } from "react";
import { Button, Form, Input, Carousel, Radio, message } from "antd";
import styles from "./styles.module.css";
import { USER_TYPE } from "../../constants";
import MaskedInput from "../../components/MaskedInput";
import testimonialImage1 from "./images/image-1.jpg";
import testimonialImage2 from "./images/image-2.jpg";
import testimonialImage3 from "./images/image-3.jpg";
import PasswordField from "../../components/PasswordField";
import { axiosRequest } from "../../utils/axiosRequest";
import BirthDateField from "../../components/BirthDateField";
import { useAuth } from "../../contexts/AuthContext";
import showMessage from "../../utils/Message";
import PhoneNumberField from "../../components/PhoneNumberField";

export default function CreateAccount() {
    const { login } = useAuth();
    const [accountType, setAccountType] = useState(USER_TYPE.ADOPTER);
    const [loading, setLoading] = useState(false);

    const changeAccountType = (event) => {
        setAccountType(event.target.value);
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

        try {
            await axiosRequest({
                method: "post",
                path: "/adopter",
                body,
            });
            setLoading(false);
            login(body.email, body.password, accountType, true);
        } catch (error) {
            setLoading(false);
            showMessage("error", error);
        }
    };

    return (
        <>
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
                                <Form.Item>
                                    <Button
                                        type="link"
                                        style={{ width: "100%" }}
                                    >
                                        Já possui conta? Faça login
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                    {accountType === USER_TYPE.ORGANIZATION && (
                        <h3>Confia que aqui vai ter um formulário</h3>
                    )}
                </section>
                <div style={{ position: "fixed", right: "0" }}>
                    <Carousel
                        className={styles.carousel}
                        autoplay
                        autoplaySpeed={8000}
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
                                nossa casa."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div></div>
                                <p>Maiara, tutora do Teodoro</p>
                            </div>
                        </div>
                        <div className={styles.banner}>
                            <div
                                style={{
                                    backgroundImage: `url(${testimonialImage2})`,
                                }}
                                className={styles.backgroundPhoto}
                            ></div>
                            <p className={styles.testimonialText}>
                                "O site foi o elo que nos uniu a Nina, nossa
                                adorável cachorrinha. Desde que ela chegou,
                                nossas vidas se encheram de risadas e carinho.
                                Não poderíamos estar mais gratos por essa
                                conexão especial."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div></div>
                                <p>Giovanna, tutora da Nina</p>
                            </div>
                        </div>
                        <div className={styles.banner}>
                            <div
                                style={{
                                    backgroundImage: `url(${testimonialImage3})`,
                                }}
                                className={styles.backgroundPhoto}
                            ></div>
                            <p className={styles.testimonialText}>
                                "Jamais esquecerei o dia em que me deparei com a
                                foto de Otto neste site. Ele se tornou mais do
                                que um simples animal de estimação: é um membro
                                querido da família."
                            </p>
                            <div className={styles.testimonialAuthor}>
                                <div></div>
                                <p>Lucas, tutor do Otto</p>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
