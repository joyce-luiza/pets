import React from "react";
import PropTypes from "prop-types";
import "./styles/TextInput.css";

const TextInput = ({ label, icon, error, errorMessage, ...rest }) => {
    return (
        <div className="text-input-container">
            <label>{label}</label>
            <div className={`input-wrapper ${error ? "error" : ""}`}>
                <input {...rest} />
                {icon && <div className="input-icon">{icon}</div>}
            </div>
            {error && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.element, // Ícone do input (opcional)
    error: PropTypes.bool, // Estado de erro
    errorMessage: PropTypes.string, // Mensagem de erro
};

export default TextInput;
