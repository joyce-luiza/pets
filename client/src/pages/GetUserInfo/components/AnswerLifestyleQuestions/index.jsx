import React from "react";
import styles from "./styles.module.css";
import lifestyleDog from "../../../../assets/lifestyle-form-init.jpg";
import { Link } from "react-router-dom"; //Remover importação caso não use nos novos botões
import { Button } from "antd";

export default function AnswerLifestyleQuestions({ answerQuestionsFn }) {
    return (
        <div className={styles.container}>
            <div className={styles.toAnswerForm}>
                <h2>Queremos saber mais sobre você!</h2>
                <span className={styles.description}>
                    Gostaríamos de fazer mais algumas perguntas para entender
                    mais sobre seu perfil. Assim, nós podemos te ajudar ainda
                    mais a encontrar o pet perfeito para você. É possível
                    responder a qualquer momento, basta acessar seu perfil :)
                </span>
                <div className={styles.callToAction}>
                    <Button
                        size="large"
                        type="primary"
                        onClick={answerQuestionsFn}
                    >
                        Quero responder
                    </Button>
                    <Button size="large" type="secondary">
                        <Link to={"/"}>Talvez mais tarde</Link>
                    </Button>
                </div>
            </div>
            <img className={styles.lifestyleDog} src={lifestyleDog} alt="" />
        </div>
    );
}
