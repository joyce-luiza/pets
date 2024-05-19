import React from "react";
import styles from "./styles.module.css";
import lifestyleCatFinish from "../../../../../../assets/lifestyle-form-finish.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function FinishLifestyleForm() {
  return (
    <div className={styles.container}>
      <div className={styles.toAnswerForm}>
        <h2>Tudo pronto para o match perfeito!</h2>
        <span className={styles.description}>
          Você pode alterar as suas informações a qualquer momento acessando o
          seu perfil.
        </span>
        <div className={styles.callToAction}>
          <Button size="large" type="primary">
            <Link to={"/"}>Ir para home</Link>
          </Button>
          <Button size="large" type="secondary">
            <Link to={"/profile"}>Ir para perfil</Link>
          </Button>
        </div>
      </div>
      <img className={styles.lifestyleCat} src={lifestyleCatFinish} alt="" />
    </div>
  );
}
