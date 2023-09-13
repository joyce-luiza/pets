import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/PasswordInput.css"; // Importe os estilos CSS

const PasswordInput = ({ label, onChange }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        onChange(newPassword);
    };

    // Critérios padrão de senha
    const defaultPasswordCriteria = [
        {
            label: "Pelo menos 10 caracteres",
            regex: /^.{10,}$/,
        },
        {
            label: "Pelo menos uma letra maiúscula",
            regex: /[A-Z]/,
        },
        {
            label: "Pelo menos um símbolo especial",
            regex: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        },
        {
            label: "Pelo menos um número",
            regex: /[0-9]/,
        },
    ];

    return (
        <div className="password-input-container">
            <label>{label}</label>
            <div className="password-input-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Digite uma senha"
                />
                <div
                    type="button"
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <i className="ri-eye-off-line ri-xl"></i>
                    ) : (
                        <i className="ri-eye-line ri-xl"></i>
                    )}
                </div>
            </div>
            <div className="password-criteria">
                {defaultPasswordCriteria.map((criterion, index) => (
                    <div
                        key={index}
                        className={`criterion ${
                            password.match(criterion.regex) ? "valid" : ""
                        }`}
                    >
                        {password.match(criterion.regex) ? (
                            <i className="ri-checkbox-circle-line"></i>
                        ) : (
                            <i className="ri-checkbox-blank-circle-line"></i>
                        )}

                        <p>{criterion.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
