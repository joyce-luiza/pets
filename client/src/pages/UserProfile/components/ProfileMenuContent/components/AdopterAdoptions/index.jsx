import React, { useState, useEffect } from "react";
import { Typography, Empty } from "antd";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import AdoptionCard from "./components/AdoptionCard";
import AdoptionDetails from "./components/AdoptionsDetails";
import showMessage from "../../../../../../utils/Message";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

export default function AdopterAdoptions({ user }) {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdoption, setSelectedAdoption] = useState(null);

    const getAdoptions = async () => {
        setLoading(true);
        try {
            const result = await axiosRequest({
                method: "get",
                path: `/adoption/adopter/${user.id}`,
            });
            setAdoptions(result);
            setLoading(false);
        } catch (error) {
            showMessage("error", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAdoptions();
    }, [user.id]);

    return !loading ? (
        <div className={styles.container}>
            {selectedAdoption ? (
                <AdoptionDetails
                    adoption={selectedAdoption}
                    onBack={() => setSelectedAdoption(null)}
                />
            ) : (
                <div className={styles.adoptions}>
                    <Title level={2} style={{ textAlign: "left" }}>
                        Adoções
                    </Title>
                    {adoptions.length ? (
                        <div className={styles.adoptionsContainer}>
                            {adoptions.map((adoption) => (
                                <AdoptionCard
                                    key={adoption.id}
                                    adoption={adoption}
                                    onViewDetails={() =>
                                        setSelectedAdoption(adoption)
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <Empty description="Você não possui adoções por enquanto."></Empty>
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : (
        <Paragraph>Carregando...</Paragraph>
    );
}
