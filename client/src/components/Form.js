import React from "react";
import "./styles/Form.css";
import Button from "./Button";

const Form = ({ title, children, callToAction, onClick }) => {
  return (
    <div className="form">
      <h2>{title}</h2>
      {children}
      <Button
        text={callToAction}
        styleType={"default"}
        size={"medium"}
        onClick={onClick}
      ></Button>
    </div>
  );
};

export default Form;
