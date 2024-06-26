import { React } from "react";
import { Button, Flex, Typography } from "antd";
import styles from "./styles.module.css";
import { RESULTS } from "../../../../../../../../constants";
import ResultTag from "../../../../../../../../components/ResultTag";

const { Title, Paragraph } = Typography;

const AdoptionCard = ({ adoption, onViewDetails }) => {
    const { animal, address, organization, result } = adoption;
    const animalImage =
        animal.files.length > 0 ? animal.files[0].fileUrl : "default_image_url";

    return (
        <div className={styles.card}>
            <img
                src={animalImage}
                alt={animal.name}
                className={styles.animalImage}
            />
            <Flex
                vertical
                justify="space-between"
                style={{ width: "100%", textAlign: "left" }}
            >
                <Flex justify="space-between" align="center">
                    <Title level={3} style={{ margin: 0 }}>
                        {animal.name}
                    </Title>
                    <ResultTag result={RESULTS[result]}></ResultTag>
                </Flex>
                <Flex vertical gap={16}>
                    <Flex align="center" gap={8}>
                        <i className="ri-map-pin-2-line ri-xl"></i>
                        <Paragraph style={{ margin: 0 }}>
                            {`${address.city} - ${address.state}`}
                        </Paragraph>
                    </Flex>
                    <Flex align="center" gap={8}>
                        <i class="ri-home-heart-line ri-xl"></i>
                        <Paragraph style={{ margin: 0 }}>
                            {organization.name}
                        </Paragraph>
                    </Flex>
                </Flex>
                <Button size="large" onClick={onViewDetails}>
                    Ver detalhes
                </Button>
            </Flex>
        </div>
    );
};

export default AdoptionCard;
