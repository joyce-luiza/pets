import { React } from "react";
import { Form, DatePicker } from "antd";
import dayjs from "dayjs";

const BirthDateField = () => {
    const validateDateOfBirth = (_, value) => {
        if (value) {
            const eighteenYearsAgo = dayjs().subtract(18, "year");
            if (dayjs(value).isAfter(eighteenYearsAgo)) {
                return Promise.reject(
                    "Para criar uma conta, é necessário ter mais de 18 anos"
                );
            }
        }
        return Promise.resolve();
    };

    return (
        <Form.Item
            name="birthDate"
            label="Data de nascimento;"
            rules={[
                {
                    required: true,
                    message: "Insira a sua data de nascimento",
                },
                {
                    validator: validateDateOfBirth,
                },
            ]}
        >
            <DatePicker
                style={{ width: "100%" }}
                size="large"
                format={{
                    format: "DD/MM/YYYY",
                    type: "mask",
                }}
                placeholder="00/00/0000"
            />
        </Form.Item>
    );
};

export default BirthDateField;
