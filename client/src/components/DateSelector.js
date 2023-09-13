import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./styles/DateSelector.css";

const DateSelector = ({ label, error, errorMessage }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={`date-selector ${error ? "error" : ""}`}>
            <label>{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
            />
            {error && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

DateSelector.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.bool, // Estado de erro
    errorMessage: PropTypes.string, // Mensagem de erro
};

export default DateSelector;
