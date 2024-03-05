import React, { forwardRef } from 'react';
import { Form } from 'antd';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import './styles/Input.css';

const MaskedInput = forwardRef(function MaskedInput({ name, label, rules, ...props }, ref) {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            <InputMask {...props}>
                {(inputProps) => (
                    <input
                        {...inputProps}
                        ref={ref}
                        className="input"
                        disabled={props.disabled ? props.disabled : null}
                    />
                )}
            </InputMask>
        </Form.Item>
    );
});

MaskedInput.displayName = 'MaskedInput';

MaskedInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.object,
};

export default MaskedInput;
