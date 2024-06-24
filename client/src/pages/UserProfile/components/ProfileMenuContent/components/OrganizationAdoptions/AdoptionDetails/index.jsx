import { React, useState, useEffect } from "react";
import moment from "moment";
import { Typography, Flex, Button, Image } from "antd";
import { axiosRequest } from "../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../utils/Message";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";
import ApproveAdoption from "./components/ApproveAdoption";
import {
    RESULTS,
    ANIMAL_SEX,
    ANIMAL_SIZES,
    ANIMAL_TYPES,
} from "../../../../../../../constants";
import { getLifetime } from "../../../../../../../utils/getLifetime";
import ResultTag from "../../../../../../../components/ResultTag";

const { Title, Paragraph, Text } = Typography;

export default function AdoptionDetails({ adoptionData, onBack }) {
    const [adoption, setAdoption] = useState();
    const [adopter, setAdopter] = useState();
    const [animal, setAnimal] = useState();
    const [animalImage, setAnimalImage] = useState();

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const { adoption, adopter, animal } = await axiosRequest({
                method: "get",
                path: `/adoption/${adoptionData.id}`,
                authenticated: true,
            });
            setAdoption(adoption);
            setAdopter(adopter);
            setAnimal(animal);
            setAnimalImage(
                animal.files.length > 0
                    ? animal.files[0].fileUrl
                    : "default_image_url"
            );
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
                adopter &&
                animal &&
                adoption && (
                    <>
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
                        <Flex
                            gap={32}
                            style={{ marginTop: 24, marginBottom: 24 }}
                        >
                            <Paragraph>
                                Resultado:{" "}
                                <ResultTag
                                    result={RESULTS[adoption.result]}
                                ></ResultTag>
                            </Paragraph>
                            <Paragraph>
                                Data de início:{" "}
                                {moment(adoption.createdAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </Paragraph>
                        </Flex>
                        <Flex vertical gap={40}>
                            {RESULTS[adoption.result] !== RESULTS["PENDING"] ? (
                                <Flex gap={12} vertical>
                                    <Title
                                        level={3}
                                        style={{
                                            margin: 0,
                                            textAlign: "left",
                                        }}
                                    >
                                        Justificativa/Instruções registradas
                                    </Title>
                                    <Paragraph>
                                        {adoption.organizationReply}
                                    </Paragraph>
                                </Flex>
                            ) : (
                                ""
                            )}
                            <Flex vertical gap={24}>
                                <Title
                                    level={3}
                                    style={{ margin: 0, textAlign: "left" }}
                                >
                                    Pet a ser adotado
                                </Title>
                                <Flex gap={24} align="center">
                                    <div className={styles.card}>
                                        <img
                                            src={animalImage}
                                            alt={animal.name}
                                            className={styles.animalImage}
                                        />
                                    </div>

                                    <Flex vertical gap={24}>
                                        <Title level={4} style={{ margin: 0 }}>
                                            {animal.name}
                                        </Title>
                                        <Flex
                                            align="center"
                                            justify="space-between"
                                            gap={24}
                                        >
                                            <Flex
                                                gap={8}
                                                vertical
                                                align="center"
                                            >
                                                <Text>Tipo</Text>
                                                <Text
                                                    className={
                                                        styles.animalInfo
                                                    }
                                                >
                                                    {ANIMAL_TYPES[animal.type]}
                                                </Text>
                                            </Flex>
                                            <div
                                                className={styles.divider}
                                            ></div>
                                            <Flex
                                                gap={8}
                                                vertical
                                                align="center"
                                            >
                                                <Text>Idade</Text>
                                                <Text
                                                    className={
                                                        styles.animalInfo
                                                    }
                                                >
                                                    {getLifetime(
                                                        animal.birthDate
                                                    )}
                                                </Text>
                                            </Flex>
                                            <div
                                                className={styles.divider}
                                            ></div>
                                            <Flex
                                                gap={8}
                                                vertical
                                                align="center"
                                            >
                                                <Text>Sexo</Text>
                                                <Text
                                                    className={
                                                        styles.animalInfo
                                                    }
                                                >
                                                    {ANIMAL_SEX[animal.sex]}
                                                </Text>
                                            </Flex>
                                            <div
                                                className={styles.divider}
                                            ></div>
                                            <Flex
                                                gap={8}
                                                vertical
                                                align="center"
                                            >
                                                <Text>Porte</Text>
                                                <Text
                                                    className={
                                                        styles.animalInfo
                                                    }
                                                >
                                                    {ANIMAL_SIZES[animal.size]}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
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
                                        style={{ borderRadius: ".5em" }}
                                        width={150}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    ></Image>
                                    <Flex gap={4} vertical justify="center">
                                        <Title level={4}>
                                            {adopter.firstName}{" "}
                                            {adopter.lastName}
                                        </Title>
                                        <Flex gap={32}>
                                            <Flex gap={12} align="center">
                                                <i class="ri-mail-line  ri-xl"></i>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    {adopter.email}
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} align="center">
                                                <i class="ri-phone-line  ri-xl"></i>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
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
                                            <Title
                                                style={{ margin: 0 }}
                                                level={4}
                                            >
                                                Motivação da adoção
                                            </Title>
                                        </Flex>
                                        <Paragraph style={{ margin: 0 }}>
                                            {adoption.notes}
                                        </Paragraph>
                                    </Flex>
                                    <Flex gap={24} vertical>
                                        <Flex gap={8} align="center">
                                            <i class="ri-emotion-2-line ri-xl"></i>
                                            <Title
                                                style={{ margin: 0 }}
                                                level={4}
                                            >
                                                Preferências
                                            </Title>
                                        </Flex>
                                        <Flex gap={48}>
                                            <Flex gap={12} vertical>
                                                <label>Tipo de animal</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    tipo de animal
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Faixa etária</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    faixa etária
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Tamanho</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    tamanho
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Sexo</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    sexo
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Cor</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    cor
                                                </Paragraph>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex gap={24} vertical>
                                        <Flex gap={8} align="center">
                                            <i class="ri-open-arm-line ri-xl"></i>
                                            <Title
                                                style={{ margin: 0 }}
                                                level={4}
                                            >
                                                Estilo de vida
                                            </Title>
                                        </Flex>
                                        <Flex gap={48}>
                                            <Flex gap={12} vertical>
                                                <label>
                                                    Possui outros pets?
                                                </label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    sim
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>
                                                    Rotina de trabalho
                                                </label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    flexível
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>
                                                    Frequência de viagens
                                                </label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    raro
                                                </Paragraph>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex gap={24} vertical>
                                        <Flex gap={8} align="center">
                                            <i class="ri-home-2-line ri-xl"></i>{" "}
                                            <Title
                                                style={{ margin: 0 }}
                                                level={4}
                                            >
                                                Endereço
                                            </Title>
                                        </Flex>
                                        <Flex gap={48}>
                                            <Flex gap={12} vertical>
                                                <label>
                                                    {" "}
                                                    Tipo de residência
                                                </label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    apartamento
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Localização</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    Mogi das Cruzes - SP
                                                </Paragraph>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <ApproveAdoption
                            adoptionId={adoptionData.id}
                            open={isApproveModalOpen}
                            setIsModalOpen={setIsApproveModalOpen}
                            updateAdoptionDetails={getData}
                        ></ApproveAdoption>
                    </>
                )
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
