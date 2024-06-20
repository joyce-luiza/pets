import React from "react";
import { Typography } from "antd";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const PetCard = () => {
  return (
    <div className={styles.petCard}>
      <div className={styles.photo}></div>
      <div className={styles.description}>
        <Title level={3} style={{ margin: 0 }}>
          Mel
        </Title>
        <div className={styles.descriptionLine}>
          <div className={styles.petAge}>
            <i className="ri-calendar-line ri-lg"></i>
            <Paragraph style={{ margin: 0 }}>2 anos (adulto)</Paragraph>
          </div>
          <div className={styles.petGender}>
            <i className="ri-women-line ri-lg"></i>
            <Paragraph style={{ margin: 0 }}>Fêmea</Paragraph>
          </div>
        </div>
        <div className={styles.petLocation}>
          <i className="ri-map-pin-2-line ri-lg"></i>
          <Paragraph style={{ margin: 0 }}>Mogi das Cruzes - SP</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
