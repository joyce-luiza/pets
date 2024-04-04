import React from "react";
import styles from "./styles.module.css";

const PetCard = () => {
    return (
        <div className={styles.petCard}>
            <div className={styles.photo}></div>
            <div className={styles.description}>
                <h1>Mel</h1>
                <div className={styles.descriptionLine}>
                    <div className={styles.petAge}>
                        <i class="ri-calendar-line ri-lg"></i>
                        <p>2 anos (adulto)</p>
                    </div>
                    <div className={styles.petGender}>
                        <i class="ri-women-line ri-lg"></i>
                        <p>Fêmea</p>
                    </div>
                </div>
                <div className={styles.petLocation}>
                    <i class="ri-map-pin-2-line ri-lg"></i>
                    <p>Mogi das Cruzes - SP</p>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
