import React, { useState } from "react";
import { Steps } from "antd";
import styles from "./styles.module.css";
import OrganizationInfo from "./components/OrganizationInfo";
import { axiosRequest } from "../../utils/axiosRequest";
import showMessage from "../../utils/Message";
import AdminUser from "./components/AdminUser";
import Address from "./components/Address";
import Installations from "./components/Installations";
import Team from "./components/Team";

export default function GetOrgInfo() {
    const { Step } = Steps;
    const [organization, setOrganization] = useState({});
    const [address, setAddress] = useState({});
    const [installations, setInstallations] = useState({});
    const [emails, setEmails] = useState([""]);
    const [adminUser, setAdminUser] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({});

    const finishForm = async () => {
        setData({
            adminUser: adminUser,
            organization: organization,
            address: address,
            installations: installations,
            team: emails,
        });
        const body = organization;
        try {
            await axiosRequest({
                method: "post",
                path: "/organization",
                body,
            });
        } catch (error) {
            showMessage("error", error);
        }
    };

    const onChange = (value) => {
        setCurrentStep(value);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const steps = [
        {
            title: "Administrador",
            description: "Vamos definir um usuário administrador",
            content: (
                <AdminUser
                    answers={adminUser}
                    updateAnswers={setAdminUser}
                    nextStep={nextStep}
                />
            ),
        },
        {
            title: "Informações gerais",
            description: "Conte-nos um pouco mais sobre a organização",
            content: (
                <OrganizationInfo
                    answers={organization}
                    updateAnswers={setOrganization}
                    prevStep={prevStep}
                    nextStep={nextStep}
                />
            ),
        },

        {
            title: "Endereço",
            description: "Gostaríamos de saber a localização da organização",
            content: (
                <Address
                    answers={address}
                    updateAnswers={setAddress}
                    prevStep={prevStep}
                    nextStep={nextStep}
                />
            ),
        },
        {
            title: "Instalações",
            description: "Vamos definir quantos animais podem ser acomodados",
            content: (
                <Installations
                    answers={installations}
                    updateAnswers={setInstallations}
                    prevStep={prevStep}
                    nextStep={nextStep}
                />
            ),
        },
        {
            title: "Equipe",
            description: "Você pode conceder acesso para o restante da equipe",
            content: (
                <Team
                    emails={emails}
                    setEmails={setEmails}
                    prevStep={prevStep}
                    finishForm={finishForm}
                ></Team>
            ),
        },
    ];

    return (
        <div className={styles.formContainer}>
            <div className={styles.stepsContainer}>
                <h2>Cadastrar organização</h2>
                <p className="body1">
                    Antes de criar um conta, gostaríamos de coletar os dados
                    sobre a sua organização.
                </p>
                <Steps
                    current={currentStep}
                    direction="vertical"
                    onChange={onChange}
                >
                    {steps.map((item) => (
                        <Step
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            className={styles.step}
                        />
                    ))}
                </Steps>
            </div>
            <div className={styles.divider}>
                <span></span>
            </div>
            <div className={styles.stepsContent}>
                {steps[currentStep].content}
            </div>
        </div>
    );
}
