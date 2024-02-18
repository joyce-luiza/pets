import { Form, Input } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const defaultPasswordCriteria = [
    {
        label: "Pelo menos 10 caracteres",
        regex: /^.{10,}$/,
        isValid: false,
    },
    {
        label: "Pelo menos uma letra maiúscula",
        regex: /[A-Z]/,
        isValid: false,
    },
    {
        label: "Pelo menos um símbolo especial",
        regex: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        isValid: false,
    },
    {
        label: "Pelo menos um número",
        regex: /[0-9]/,
        isValid: false,
    },
];

const PasswordField = ({ name }) => {
    const [password, setPassword] = useState("");

    const updateCriteriaValidity = (value) => {
        defaultPasswordCriteria.forEach((criteria) => {
            criteria.isValid = criteria.regex.test(value);
        });
    };

    return (
        <div>
            <Form.Item
                style={{ marginBottom: "8px" }}
                label="Senha:"
                name={name}
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: "Insira uma senha",
                    },
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.resolve();
                            }
                            updateCriteriaValidity(value);
                            const isValid = defaultPasswordCriteria.every(
                                (criteria) => criteria.regex.test(value)
                            );
                            if (!isValid) {
                                return Promise.reject(
                                    "A senha não atende aos critérios necessários."
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input.Password
                    size="large"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => {
                        updateCriteriaValidity(e.target.value);
                        setPassword(e.target.value);
                    }}
                />
            </Form.Item>
            <div style={{ marginBottom: "40px" }}>
                {defaultPasswordCriteria.map((criteria) => (
                    <div
                        key={criteria.label}
                        style={{
                            color: criteria.isValid ? "#27ae60" : "#828282",
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        {criteria.isValid ? (
                            <i className="ri-checkbox-circle-line"></i>
                        ) : (
                            <i className="ri-checkbox-blank-circle-line"></i>
                        )}
                        {criteria.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

PasswordField.propTypes = {
    name: PropTypes.string,
};

export default PasswordField;
