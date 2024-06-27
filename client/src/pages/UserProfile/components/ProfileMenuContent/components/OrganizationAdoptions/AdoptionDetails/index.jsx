import { React, useState, useEffect } from "react";
import moment from "moment";
import { Typography, Flex, Button, List } from "antd";
import { axiosRequest } from "../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../utils/Message";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";
import ApproveAdoption from "./components/ApproveAdoption";
import {
    RESULTS,
    ANIMAL_COLORS,
    ANIMAL_AGE_GROUPS,
    ANIMAL_SEX,
    ANIMAL_SIZES,
    ANIMAL_TYPES,
    RESIDENCE_TYPE,
} from "../../../../../../../constants";
import { getLifetime } from "../../../../../../../utils/getLifetime";
import ResultTag from "../../../../../../../components/ResultTag";
import RequestVisit from "./components/RequestVisit";

const { Title, Paragraph, Text } = Typography;

export default function AdoptionDetails({ adoptionData, onBack }) {
    const [adoption, setAdoption] = useState({});
    const [adopter, setAdopter] = useState({});
    const [animal, setAnimal] = useState({});
    const [animalImage, setAnimalImage] = useState();
    const [lifestyle, setLifestyle] = useState({});
    const [address, setAddress] = useState({});

    const [routine, setRoutine] = useState("");
    const [travelFrequency, setTravelFrequency] = useState("");
    const [totalPets, setTotalPets] = useState("");

    const [preferencesList, setPreferencesList] = useState([]);

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const { adoption, animal } = await axiosRequest({
                method: "get",
                path: `/adoption/${adoptionData.id}`,
                authenticated: true,
            });
            const { adopter, address, lifestyle, preferences } =
                await axiosRequest({
                    method: "get",
                    path: `/adopter/all/${adoption.adopterId}`,
                    authenticated: true,
                });
            setAdoption(adoption);
            setAdopter(adopter);
            setLifestyle(lifestyle);
            setAddress(address);
            setAnimal(animal);
            setAnimalImage(
                animal.files.length > 0
                    ? animal.files[0].fileUrl
                    : "default_image_url"
            );
            setPreferencesList([
                {
                    title: "Tipo de Animal",
                    value: getPreferenceString(
                        preferences.animalTypes,
                        ANIMAL_TYPES
                    ),
                },
                {
                    title: "Idade do Animal",
                    value: getPreferenceString(
                        preferences.animalAgeGroups,
                        ANIMAL_AGE_GROUPS
                    ),
                },
                {
                    title: "Tamanho do Animal",
                    value: getPreferenceString(
                        preferences.animalSizes,
                        ANIMAL_SIZES
                    ),
                },
                {
                    title: "Cor do Animal",
                    value: getPreferenceString(
                        preferences.animalColors,
                        ANIMAL_COLORS
                    ),
                },
                {
                    title: "Sexo do Animal",
                    value: getPreferenceString(
                        preferences.animalSexes,
                        ANIMAL_SEX
                    ),
                },
            ]);

            setLoading(false);
        } catch (error) {
            showMessage("error", error);
        }
    };

    const getPreferenceString = (preference, constant) => {
        if (preference === null || Object.keys(preference).length === 0) {
            return "Sem preferência";
        }
        return Object.keys(preference)
            .filter((key) => preference[key])
            .map((key) => constant[key])
            .join(", ");
    };

    const getRoutine = (routine) => {
        switch (routine) {
            case "FULL_TIME":
                setRoutine("Trabalho em período integral, raramente em casa.");
                break;
            case "FLEXIBLE":
                setRoutine(
                    "Horário flexível, posso passar tempo em casa durante o dia"
                );
                break;
            case "AVAILABLE":
                setRoutine(
                    "Trabalho em casa, disponível para interação com o pet o dia todo."
                );
                break;
            default:
                setRoutine("Não informado");
        }
    };
    const getTravelFrequency = (travelFrequency) => {
        switch (travelFrequency) {
            case "REGULAR":
                setTravelFrequency("Regularmente, por longos períodos.");
                break;
            case "OCCASIONALLY":
                setTravelFrequency("Ocasionalmente, por curtos períodos.");
                break;
            case "RARELLY":
                setTravelFrequency("Raramente viajo.");
                break;
            default:
                setTravelFrequency("Não informado");
        }
    };

    const getTotalPets = (total) => {
        switch (total) {
            case 0:
                setTotalPets("Sim, possuo 1 pet");
                break;
            case 1:
                setTotalPets("Sim, possuo 2 pets");
                break;
            case 2:
                setTotalPets("Sim, possuo 3 pets");
                break;
            case 3:
                setTotalPets("Sim, possuo 4 pets");
                break;
            case 4:
                setTotalPets("Sim, possuo 4 pets");
                break;
            default:
                setTotalPets("Não informado");
        }
    };

    useEffect(() => {
        getData();
        getRoutine(lifestyle.routine);
        getTravelFrequency(lifestyle.travelFrequency);
        getTotalPets(lifestyle.totalPets);
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
                                        onClick={() =>
                                            setIsVisitModalOpen(true)
                                        }
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
                                                <label>Tipo</label>
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
                                                <label>Idade</label>
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
                                                <label>Sexo</label>
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
                                                <label>Porte</label>
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
                                    <img
                                        src={adopter.imageUrl}
                                        alt={adopter.firstName}
                                        className={styles.animalImage}
                                    />

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
                                        <List
                                            dataSource={preferencesList}
                                            style={{ width: "600px" }}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <label>{item.title}:</label>{" "}
                                                    {item.value}
                                                </List.Item>
                                            )}
                                        />
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
                                        <Flex gap={12} vertical>
                                            <label>Possui outros pets?</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                {totalPets}
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Rotina de trabalho</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                {routine}
                                            </Paragraph>
                                        </Flex>
                                        <Flex gap={12} vertical>
                                            <label>Frequência de viagens</label>
                                            <Paragraph style={{ margin: 0 }}>
                                                {travelFrequency}
                                            </Paragraph>
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
                                                    {
                                                        RESIDENCE_TYPE[
                                                            address
                                                                .residenceType
                                                        ]
                                                    }
                                                </Paragraph>
                                            </Flex>
                                            <Flex gap={12} vertical>
                                                <label>Localização</label>
                                                <Paragraph
                                                    style={{ margin: 0 }}
                                                >
                                                    {address.city} -{" "}
                                                    {address.state}
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
                        <RequestVisit
                            adopterId={adopter.id}
                            organizationId={null}
                            open={isVisitModalOpen}
                            setIsModalOpen={setIsVisitModalOpen}
                        />
                    </>
                )
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
