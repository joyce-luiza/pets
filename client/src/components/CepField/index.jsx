import { React } from "react";
import { Form } from "antd";
import InputMask from "react-input-mask";

const CepField = ({ value, onChange, ...props }) => {
    const validateCep = (_, value) => {
        if (value) {
            const numericValue = value.replace(/[^\d]/g, "");
            if (numericValue && numericValue.length < 8) {
                return Promise.reject("Por favor, insira um CEP válido");
            }
        }
        return Promise.resolve();
    };

    return (
        <Form.Item
            label="CEP:"
            name="cep"
            rules={[
                {
                    required: true,
                    message: "Por favor, insira um CEP",
                },
                {
                    validator: validateCep,
                },
            ]}
            validateTrigger="onBlur"
            labelCol={{ span: 24 }}
        >
            <InputMask
                placeholder="_____-___"
                type="text"
                mask="99999-999"
                value={value}
                onChange={onChange}
                {...props}
            ></InputMask>
        </Form.Item>
    );
};

export default CepField;
