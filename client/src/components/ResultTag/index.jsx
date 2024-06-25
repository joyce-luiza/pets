import React from "react";
import styles from "./styles.module.css";

const ResultTag = ({ result }) => {
    const getStatusClass = (result) => {
        switch (result) {
            case "Aprovado":
                return styles.approved;
            case "Pendente":
                return styles.pending;
            case "Reprovado":
                return styles.rejected;
            default:
                return "";
        }
    };

    return (
        <span className={`${styles.tag} ${getStatusClass(result)}`}>
            {result}
        </span>
    );
};

export default ResultTag;
