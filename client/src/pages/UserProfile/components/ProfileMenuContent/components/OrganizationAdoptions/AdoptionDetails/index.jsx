import { React, useState, useEffect } from "react";
import moment from "moment";
import { Typography, Flex, Button, Image } from "antd";
import { RESULTS } from "../../../../../../../constants";
import { axiosRequest } from "../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../utils/Message";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";
import ApproveAdoption from "./components/ApproveAdoption";

const { Title, Paragraph } = Typography;

export default function AdoptionDetails({ adoption, onBack }) {
    const [adopter, setAdopter] = useState();
    const [adoptionData, setAdoptionData] = useState();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const adopterResult = await axiosRequest({
                method: "get",
                path: `/adopter/${adoption.adopterId}`,
                authenticated: true,
            });
            const { birthDate, firstName, lastName } = adopterResult;
            const formattedAdopter = {
                ...adopterResult,
                fullName: `${firstName} ${lastName}`,
                birthDate: moment(birthDate).format("DD/MM/YYYY"),
            };
            const adoptionResult = await axiosRequest({
                method: "get",
                path: `/adoption/${adoption.id}`,
                authenticated: true,
            });
            const formattedAdoption = {
                ...adoptionResult,
                createdAt: moment(adoptionResult.createdAt).format(
                    "DD/MM/YYYY"
                ),
            };
            setAdoptionData(formattedAdoption);
            setAdopter(formattedAdopter);
            setLoading(false);
        } catch (error) {
            showMessage("error", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.container}>
            {!loading ? (
                <>
                    <div>
                        <Button
                            icon={<i class="ri-arrow-left-line"></i>}
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => onBack()}
                        >
                            Voltar
                        </Button>
                        <Flex
                            justify="space-between"
                            align="center"
                            style={{ marginTop: 32 }}
                        >
                            <Title
                                level={2}
                                style={{ margin: 0, textAlign: "left" }}
                            >
                                Detalhes da adoção
                            </Title>

                            {RESULTS[adoptionData.result] ===
                            RESULTS["PENDING"] ? (
                                <Flex gap={32}>
                                    <Button
                                        type="default"
                                        size="large"
                                        data-cy="update-organization-button"
                                    >
                                        Solicitar visita
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            setIsApproveModalOpen(true)
                                        }
                                        size="large"
                                        data-cy="delete-organization-button"
                                    >
                                        Avaliar adoção
                                    </Button>
                                </Flex>
                            ) : (
                                ""
                            )}
                        </Flex>
                        <Flex gap={32} style={{ marginTop: 24 }}>
                            <Paragraph>
                                Data de início: {adoptionData.createdAt}
                            </Paragraph>
                            <Paragraph>
                                Status: {RESULTS[adoptionData.result]}
                            </Paragraph>
                        </Flex>
                        {RESULTS[adoptionData.result] !== RESULTS["PENDING"] ? (
                            <>
                                <Flex
                                    gap={12}
                                    vertical
                                    style={{ marginTop: 32 }}
                                >
                                    <Title
                                        level={3}
                                        style={{ margin: 0, textAlign: "left" }}
                                    >
                                        Justificativa/Instruções registradas
                                    </Title>
                                    <Paragraph>
                                        {adoptionData.organizationReply}
                                    </Paragraph>
                                </Flex>
                            </>
                        ) : (
                            ""
                        )}
                        <Flex
                            justify="space-between"
                            style={{ marginTop: 32 }}
                            gap={40}
                            vertical
                        >
                            <Title
                                level={3}
                                style={{ margin: 0, textAlign: "left" }}
                            >
                                Adotante
                            </Title>
                            <Flex gap={32}>
                                <Image
                                    style={{ borderRadius: 100 }}
                                    width={150}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                ></Image>
                                <Flex gap={4} vertical justify="center">
                                    <Title level={4}>
                                        {adopter.firstName} {adopter.lastName}
                                    </Title>
                                    <Flex gap={32}>
                                        <Flex gap={12} align="center">
                                            <i class="ri-mail-line  ri-xl"></i>
                                            <Paragraph style={{ margin: 0 }}>
                                                {adopter.email}
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} align="center">
                                            <i class="ri-phone-line  ri-xl"></i>
                                            <Paragraph style={{ margin: 0 }}>
                                                {adopter.phoneNumber}
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex gap={40} vertical>
                                <Flex gap={12} vertical>
                                    <Flex gap={8} align="center">
                                        <i class="ri-edit-box-line ri-xl"></i>
                                        <Title style={{ margin: 0 }} level={4}>
                                            Motivação da adoção
                                        </Title>
                                    </Flex>
                                    <Paragraph style={{ margin: 0 }}>
                                        {adoptionData.notes}
                                    </Paragraph>
                                </Flex>
                                <Flex gap={24} vertical>
                                    <Flex gap={8} align="center">
                                        <i class="ri-emotion-2-line ri-xl"></i>
                                        <Title style={{ margin: 0 }} level={4}>
                                            Preferências
                                        </Title>
                                    </Flex>
                                    <Flex gap={48}>
                                        <Flex gap={12} vertical>
                                            <label>Tipo de animal</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                tipo de animal
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Faixa etária</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                faixa etária
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Tamanho</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                tamanho
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Sexo</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                sexo
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Cor</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                cor
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex gap={24} vertical>
                                    <Flex gap={8} align="center">
                                        <i class="ri-open-arm-line ri-xl"></i>
                                        <Title style={{ margin: 0 }} level={4}>
                                            Estilo de vida
                                        </Title>
                                    </Flex>
                                    <Flex gap={48}>
                                        <Flex gap={12} vertical>
                                            <label>Possui outros pets?</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                sim
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Rotina de trabalho</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                flexível
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Frequência de viagens</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                raro
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex gap={24} vertical>
                                    <Flex gap={8} align="center">
                                        <i class="ri-home-2-line ri-xl"></i>{" "}
                                        <Title style={{ margin: 0 }} level={4}>
                                            Endereço
                                        </Title>
                                    </Flex>
                                    <Flex gap={48}>
                                        <Flex gap={12} vertical>
                                            <label> Tipo de residência</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                apartamento
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Localização</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                Mogi das Cruzes - SP
                                            </Paragraph>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                    <ApproveAdoption
                        adoptionId={adoptionData.id}
                        open={isApproveModalOpen}
                        setIsModalOpen={setIsApproveModalOpen}
                        updateAdoptionDetails={getData}
                    ></ApproveAdoption>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
