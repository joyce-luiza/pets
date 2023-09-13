import React from "react";
import { useState } from "react";
import TextInput from "../components/TextInput";
import Form from "../components/Form";
import DateSelector from "../components/DateSelector";
import PasswordInput from "../components/PasswordInput";
import Link from "../components/Link";
import "./styles/CreateAccount.css";

const CreateAccount = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    const handleInputChange = (event) => {};

    const handlePasswordChange = (newPassword) => {
        console.log("Nova senha:", newPassword);
    };

    return (
        <div className="create-account">
            <div className="create-account-form">
                <Form
                    title="Criar conta"
                    callToAction={"Criar conta"}
                    onClick={""}
                >
                    <TextInput
                        label="Nome:"
                        placeholder="Digite seu nome"
                        value={value}
                        onChange={handleInputChange}
                        error={error}
                        errorMessage="Este campo é obrigatório"
                        icon={""}
                    />
                    <TextInput
                        label="Email:"
                        placeholder="Digite seu email"
                        value={value}
                        onChange={handleInputChange}
                        error={error}
                        errorMessage="Este campo é obrigatório"
                        icon={""}
                    />
                    <DateSelector label="Data de nascimento:"></DateSelector>
                    <TextInput
                        label="Número de celular:"
                        placeholder="Digite seu número de celular"
                        value={value}
                        onChange={handleInputChange}
                        error={error}
                        errorMessage="Este campo é obrigatório"
                        icon={""}
                    />
                    <PasswordInput
                        label="Senha:"
                        onChange={handlePasswordChange}
                    ></PasswordInput>
                </Form>
                <p>
                    Já possui uma conta? <Link>Faça login</Link>
                </p>
            </div>
            <div className="create-account-banner"></div>
        </div>
    );
};

export default CreateAccount;
