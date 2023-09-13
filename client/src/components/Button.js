import React from "react";
import PropTypes from "prop-types";
import "./styles/Button.css";

const Button = ({ text, styleType, size, onClick }) => {
    const getButtonClassName = () => {
        let className = "button";

        switch (styleType) {
            case "default":
                className += " default-button";
                break;
            case "outlined":
                className += " outlined-button";
                break;
            case "text":
                className += " text-button";
                break;
            default:
                break;
        }

        switch (size) {
            case "small":
                className += " small-button";
                break;
            case "medium":
                className += " medium-button";
                break;
            case "large":
                className += " large-button";
                break;
            default:
                break;
        }

        return className;
    };

    return (
        <button className={getButtonClassName()} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    styleType: PropTypes.oneOf(["default", "outlined", "text"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
};

Button.defaultProps = {
    styleType: "default",
    size: "medium",
    onClick: () => {},
};

export default Button;
