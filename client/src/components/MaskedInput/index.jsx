import React, { forwardRef } from "react";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const MaskedInput = forwardRef(function MaskedInput(
    { name, label, rules, labelCol, ...props },
    ref
) {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            labelCol={labelCol}
            validateTrigger="onBlur"
        >
            <InputMask {...props}>
                {(inputProps) => (
                    <Input
                        {...inputProps}
                        ref={ref}
                        className={styles.input}
                        disabled={props.disabled ? props.disabled : null}
                        size="large"
                    />
                )}
            </InputMask>
        </Form.Item>
    );
});

MaskedInput.displayName = "MaskedInput";

MaskedInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.object,
};

export default MaskedInput;
