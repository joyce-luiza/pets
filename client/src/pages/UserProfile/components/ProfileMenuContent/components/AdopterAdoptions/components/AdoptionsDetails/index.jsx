import React from "react";
import { Button, Card, Col, Row, Typography, Carousel, Flex } from "antd";
import ResultTag from "../../../../../../../../components/ResultTag";
import {
    RESULTS,
    ANIMAL_AGE_GROUPS,
    ANIMAL_COLORS,
    ANIMAL_SEX,
    ANIMAL_SIZES,
    ANIMAL_TYPES,
} from "../../../../../../../../constants";
import moment from "moment";
import styles from "./styles.module.css";

const { Title, Text, Paragraph } = Typography;

const AdoptionDetails = ({ adoption, onBack }) => {
    const { animal, address, organization } = adoption;

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

    const age = getLifetime(animal.birthDate);

    return (
        <div className={styles.detailsContainer}>
            <Flex vertical align="flex-start" gap={24}>
                <Button
                    icon={<i className="ri-arrow-left-line"></i>}
                    type="link"
                    style={{ padding: 0 }}
                    onClick={onBack}
                >
                    Voltar
                </Button>

                <Title level={2}>Detalhes da Adoção</Title>
            </Flex>

            <Row gutter={[24, 24]} className={styles.details}>
                <Card
                    title="Processo de adoção"
                    style={{ width: "100%" }}
                    bordered={false}
                >
                    <Flex vertical gap={40}>
                        <Flex gap={64}>
                            <Flex vertical gap={8}>
                                <label>Resultado</label>
                                <Text>
                                    <ResultTag
                                        result={RESULTS[adoption.result]}
                                    ></ResultTag>
                                </Text>
                            </Flex>

                            <Flex vertical gap={8}>
                                <label>Data de início</label>
                                <Text>
                                    {moment(adoption.createdAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex vertical gap={8}>
                            <label>O que te motivou a adotar</label>
                            <Text>{adoption.notes}</Text>
                        </Flex>

                        <Flex vertical gap={8}>
                            <label>Resposta da organização</label>
                            <Text>{adoption.organizationReply}</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Row>
            <Row gutter={[24, 24]} className={styles.details}>
                <Card
                    title="Informações do Pet"
                    style={{ width: "100%" }}
                    bordered={false}
                >
                    <Flex gap={40}>
                        {animal.files.length > 0 && (
                            <Carousel
                                autoplay
                                className={styles.carouselContainer}
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
                        <Flex vertical gap={24} style={{ width: "50%" }}>
                            <Title level={3}>{animal.name}</Title>
                            <Flex vertical gap={48}>
                                <Flex justify="space-between">
                                    <Flex vertical gap={8}>
                                        <label>Cor</label>
                                        <Text>
                                            {ANIMAL_COLORS[animal.color]}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={8}>
                                        <label>Sexo</label>
                                        <Text>{ANIMAL_SEX[animal.sex]}</Text>
                                    </Flex>
                                    <Flex vertical gap={8}>
                                        <label>Tipo</label>
                                        <Text>{ANIMAL_TYPES[animal.type]}</Text>
                                    </Flex>
                                    <Flex vertical gap={8}>
                                        <label>Tamanho</label>
                                        <Text>{ANIMAL_SIZES[animal.size]}</Text>
                                    </Flex>
                                    <Flex vertical gap={8}>
                                        <label>Idade</label>
                                        <Text>{age}</Text>
                                    </Flex>
                                </Flex>

                                <Flex vertical gap={8}>
                                    <label>Informações médicas</label>
                                    <Text>{animal.medicalInformation}</Text>
                                </Flex>

                                <Flex vertical gap={8}>
                                    <label>Descrição</label>
                                    <Text>{animal.description}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Row>
            <Row gutter={[24, 24]} className={styles.details}>
                <Card
                    title="Informações da Organização"
                    bordered={false}
                    style={{ width: "100%" }}
                >
                    <Flex vertical gap={24}>
                        <Flex vertical gap={8}>
                            <label>Nome</label>
                            <Text>{organization.name}</Text>
                        </Flex>

                        <Flex vertical gap={16}>
                            <label>Contatos</label>
                            <Flex gap={48}>
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
                                    <label>{organization.phoneNumber}</label>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex vertical gap={8}>
                            <label>Descrição</label>
                            <Text>{organization.description}</Text>
                        </Flex>

                        <Flex vertical gap={16}>
                            <label>Endereço</label>
                            <Flex gap={12}>
                                <label>
                                    <i className="ri-map-pin-2-line ri-xl"></i>
                                </label>
                                <label>
                                    {`${address.street}, ${address.number} - ${address.city}-${address.state}`}
                                </label>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Row>
        </div>
    );
};

export default AdoptionDetails;
