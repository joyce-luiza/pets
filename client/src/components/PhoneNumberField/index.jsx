import { React } from "react";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";

const PhoneNumberField = () => {
    const validatePhone = (_, value) => {
        const numericValue = value.replace(/[^\d]/g, "");
        if (numericValue && numericValue.length < 11) {
            return Promise.reject("Por favor, insira um número válido");
        }
        return Promise.resolve();
    };

    return (
        <Form.Item
            label="Número de celular:"
            name="phoneNumber"
            rules={[
                {
                    required: true,
                    message: "Insira um número de telefone",
                },
                {
                    validator: validatePhone,
                },
            ]}
            validateTrigger="onBlur"
        >
            <InputMask type="text" mask="(99) 99999-9999">
                {() => <Input size="large" placeholder="(00) 00000-0000" />}
            </InputMask>
        </Form.Item>
    );
};

export default PhoneNumberField;
