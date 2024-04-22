import { React } from "react";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";

const CnpjField = ({ ...props }) => {
    const validateCnpj = (_, value) => {
        if (value) {
            const numericValue = value.replace(/[^\d]/g, "");
            if (numericValue && numericValue.length < 14) {
                return Promise.reject("Por favor, insira um CNPJ válido");
            }
        }
        return Promise.resolve();
    };

    return (
        <Form.Item
            label="CNPJ:"
            name={"cnpj"}
            rules={[
                {
                    required: true,
                    message: "Insira um CNPJ",
                },
                {
                    validator: validateCnpj,
                },
            ]}
            validateTrigger="onBlur"
            labelCol={{ span: 24 }}
        >
            <InputMask
                mask="99.999.999/9999-99"
                placeholder="00.000.000/0000-00"
                {...props}
            ></InputMask>
        </Form.Item>
    );
};

export default CnpjField;
