import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Flex, Carousel, Typography } from "antd";
import RequestVisit from "../UserProfile/components/ProfileMenuContent/components/OrganizationAdoptions/AdoptionDetails/components/RequestVisit";
import { axiosRequest } from "../../utils/axiosRequest";
import showMessage from "../../utils/Message";
import styles from "./styles.module.css";
import { ANIMAL_SEX, ANIMAL_SIZES, ANIMAL_TYPES } from "../../constants";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";
import AdoptAnimal from "./components/AdoptAnimal";

const { Title, Text } = Typography;

export default function AnimalDetails() {
    const { user } = useAuth();
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [adoptionInProgress, setAdoptionInProgress] = useState(false);
    const [organization, setOrganization] = useState(null);
    const [address, setAddress] = useState(null);
    const [age, setAge] = useState("");
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    const showAdoptModal = () => {
        setIsAdoptModalOpen(true);
    };

    const getAnimalData = async () => {
        try {
            if (user.id) {
                const result = await axiosRequest({
                    method: "get",
                    path: `/adoption/verify/${id}`,
                    authenticated: true,
                });
                if (result === true) {
                    setAdoptionInProgress(true);
                }
            }
            const { animal, organization, address } = await axiosRequest({
                method: "get",
                path: `/animals/details/${id}`,
            });
            setAnimal(animal);
            setOrganization(organization);
            setAddress(address);
            setAge(getLifetime(animal.birthDate));
        } catch (error) {
            showMessage("error", error);
        }
    };

    const getLifetime = (date) => {
        const inputDate = moment(date);
        const currentDate = moment();
        const years = currentDate.diff(inputDate, "years");
        const months = currentDate.diff(inputDate, "months");
        const days = currentDate.diff(inputDate, "days");

        if (years >= 1) {
            return `${years} ${years > 1 ? "anos" : "ano"}`;
        } else if (months >= 1) {
            const exactMonths = months % 12;
            return `${exactMonths} ${exactMonths > 1 ? "meses" : "mês"}`;
        } else {
            return `${days} ${days > 1 ? "dias" : "dia"}`;
        }
    };

    useEffect(() => {
        getAnimalData();
    }, [id, isAdoptModalOpen]);

    return (
        <>
            {animal && (
                <div className={styles.detailsContainer}>
                    <Row gutter={48}>
                        <Col span={12} style={{ width: "100vw" }}>
                            {animal.files.length > 0 && (
                                <Carousel
                                    autoplay
                                    className={styles.carouselContainer}
                                    draggable
                                    arrows
                                >
                                    {animal.files.map((file) => (
                                        <div key={file.id}>
                                            <img
                                                src={file.fileUrl}
                                                alt={animal.name}
                                                className={styles.carouselImage}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </Col>
                        <Col span={12} style={{ paddingRight: "8em" }}>
                            <Title level={1}>{animal.name}</Title>
                            <Flex vertical gap={48}>
                                <Flex gap={48}>
                                    <Text className={styles.animalLabel}>
                                        <i className="ri-home-heart-line ri-xl"></i>
                                        {organization.name}
                                    </Text>
                                    <Text className={styles.animalLabel}>
                                        <i className="ri-map-pin-2-line ri-xl"></i>
                                        {`${address.city} - ${address.state}`}
                                    </Text>
                                </Flex>
                                <Flex align="center" justify="space-between">
                                    <Flex gap={8} vertical align="center">
                                        <Text>Tipo</Text>
                                        <Text className={styles.animalInfo}>
                                            {ANIMAL_TYPES[animal.type]}
                                        </Text>
                                    </Flex>
                                    <div className={styles.divider}></div>
                                    <Flex gap={8} vertical align="center">
                                        <Text>Idade</Text>
                                        <Text className={styles.animalInfo}>
                                            {age}
                                        </Text>
                                    </Flex>
                                    <div className={styles.divider}></div>
                                    <Flex gap={8} vertical align="center">
                                        <Text>Sexo</Text>
                                        <Text className={styles.animalInfo}>
                                            {ANIMAL_SEX[animal.sex]}
                                        </Text>
                                    </Flex>
                                    <div className={styles.divider}></div>
                                    <Flex gap={8} vertical align="center">
                                        <Text>Porte</Text>
                                        <Text className={styles.animalInfo}>
                                            {ANIMAL_SIZES[animal.size]}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex vertical>
                                    <Title level={4}>Descrição</Title>
                                    <Text>{animal.description}</Text>
                                </Flex>

                                <Flex vertical>
                                    <Title level={4}>Informações médicas</Title>
                                    <Text>{animal.medicalInformation}</Text>
                                </Flex>

                                <Flex vertical>
                                    <Title level={4}>
                                        Organização responsável
                                    </Title>
                                    <Text>
                                        {`A organização que abriga esse pet é a
                                        ${organization.name}. Entre em
                                        contato através dos canais abaixo:`}
                                    </Text>
                                    <Flex gap={48} style={{ marginTop: "1em" }}>
                                        <Flex gap={12}>
                                            <label>
                                                <i class="ri-mail-line  ri-xl"></i>
                                            </label>
                                            <label>{organization.email}</label>
                                        </Flex>
                                        <Flex gap={12}>
                                            <label>
                                                <i class="ri-phone-line  ri-xl"></i>
                                            </label>
                                            <label>
                                                {organization.phoneNumber}
                                            </label>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {!user.id ? (
                                    <div
                                        className={styles.adoptionNotification}
                                    >
                                        <p>
                                            É necessário criar uma conta para
                                            seguir com o processo de adoção.
                                        </p>
                                    </div>
                                ) : user.type !== "ORGANIZATION" ? (
                                    <Flex gap={40}>
                                        {!adoptionInProgress ? (
                                            <>
                                                <Button
                                                    size="large"
                                                    type="primary"
                                                    style={{ width: "100%" }}
                                                    onClick={showAdoptModal}
                                                >
                                                    Quero adotar
                                                </Button>
                                                <Button
                                                    size="large"
                                                    type="default"
                                                    style={{ width: "100%" }}
                                                    onClick={() => {
                                                        setIsVisitModalOpen(
                                                            true
                                                        );
                                                        console.log(
                                                            animal.organizationId
                                                        );
                                                    }}
                                                >
                                                    Agendar visita
                                                </Button>
                                            </>
                                        ) : (
                                            <Flex
                                                vertical
                                                gap={24}
                                                style={{ width: "100%" }}
                                            >
                                                <div
                                                    className={
                                                        styles.adoptionNotification
                                                    }
                                                >
                                                    <i class="ri-checkbox-circle-line ri-xl"></i>
                                                    <p>
                                                        A organização foi
                                                        notificada sobre seu
                                                        interesse no pet!
                                                    </p>
                                                </div>
                                                <Button
                                                    size="large"
                                                    type="default"
                                                    style={{ width: "100%" }}
                                                    onClick={() => {
                                                        setIsVisitModalOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Agendar visita
                                                </Button>
                                            </Flex>
                                        )}
                                    </Flex>
                                ) : (
                                    ""
                                )}
                            </Flex>
                        </Col>
                    </Row>
                    <AdoptAnimal
                        open={isAdoptModalOpen}
                        setIsModalOpen={setIsAdoptModalOpen}
                        animalId={animal.id}
                    />
                    <RequestVisit
                        adopterId={null}
                        organizationId={animal.organizationId}
                        open={isVisitModalOpen}
                        setIsModalOpen={setIsVisitModalOpen}
                    />
                </div>
            )}
        </>
    );
}
