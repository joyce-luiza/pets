import React from 'react';
import styles from './styles.module.css';
import checked from '../../../../assets/checked.svg';

export default function Stepper({ number, title, description, current, completed, lastStep }) {
    const checkedCircle = completed ? true : false;

    return (
        <div className={styles.step}>
            <div className={styles.stepProgress}>
                <div
                    className={`${
                        checkedCircle
                            ? styles.checkedCircle
                            : current
                              ? styles.currentCircle
                              : styles.baseCircle
                    }`}>
                    {completed ? (
                        <img
                            className={styles.checkedStepImg}
                            src={checked}
                            alt="Etapa concluída"
                        />
                    ) : (
                        number
                    )}
                </div>
                {!lastStep && (
                    <div className={completed ? styles.checkedLine : styles.baseLine}></div>
                )}
            </div>

            <div className={styles.stepDescription}>
                <h1 className={current | completed ? styles.currentStepTitle : styles.title}>
                    {title}
                </h1>
                <span
                    className={
                        current | completed ? styles.currentStepDescription : styles.description
                    }>
                    {description}
                </span>
            </div>
        </div>
    );
}
