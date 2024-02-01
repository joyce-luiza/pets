import React from "react";
import InputMask from "react-input-mask";
import DateInput from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/Input.css";
import "./styles/DatePicker.css";

const DatePicker = ({ name, selected, handleChange }) => {
    return (
        <DateInput
            name={name}
            selected={selected}
            placeholderText="00/00/0000"
            onChange={(date) =>
                handleChange({ target: { name: name, value: date } })
            }
            customInput={<InputMask className="input" mask="99/99/9999" />}
            dateFormat="dd/MM/yyyy"
        />
    );
};
export default DatePicker;
