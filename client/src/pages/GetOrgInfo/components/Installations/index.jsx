import React, { useState, useEffect } from "react";
import { Form, Button, InputNumber, Checkbox, TimePicker, Alert } from "antd";
import styles from "../../styles.module.css";

export default function Installations({
    answers,
    updateAnswers,
    prevStep,
    nextStep,
}) {
    const [form] = Form.useForm();
    const [days, setDays] = useState(answers ? answers.days : []);
    const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(true);
    const [loading, setLoading] = useState(false);

    const daysOfWeekOptions = [
        { label: "Domingo", value: "Sunday" },
        { label: "Segunda-feira", value: "Monday" },
        { label: "Terça-feira", value: "Tuesday" },
        { label: "Quarta-feira", value: "Wednesday" },
        { label: "Quinta-feira", value: "Thursday" },
        { label: "Sexta-feira", value: "Friday" },
        { label: "Sábado", value: "Saturday" },
    ];

    const handleChange = (value) => {
        updateAnswers((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleStepInfo = async () => {
        try {
            setLoading(true);
            await form.validateFields();
            nextStep();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleFieldChange = () => {
        const dogQty = form.getFieldValue("dogQty");
        const catQty = form.getFieldValue("catQty");
        const rabbitQty = form.getFieldValue("rabbitQty");
        const birdQty = form.getFieldValue("birdQty");
        const otherQty = form.getFieldValue("otherQty");

        const anyFieldFilled =
            dogQty > 0 ||
            catQty > 0 ||
            rabbitQty > 0 ||
            birdQty > 0 ||
            otherQty > 0;

        setIsAnyFieldFilled(anyFieldFilled);
        return anyFieldFilled;
    };

    return (
        <>
            <div className={styles.stepFormTitle}>
                <div>
                    <i className="ri-tent-line ri-2x"></i>
                    <h2 className="headline4">Instalações</h2>
                </div>
                <p className="body1">
                    Descreva as instalações da organização. Esta seção é
                    importante para entendermos melhor o ambiente onde os
                    animais são cuidados e abrigados.
                </p>
            </div>
            <Form
                layout="vertical"
                form={form}
                style={{ width: "100%" }}
                initialValues={answers}
                onValuesChange={(value) => {
                    handleChange(value);
                }}
                onFinishFailed={handleFieldChange}
                onFinish={() => {
                    const result = handleFieldChange();
                    if (result) {
                        handleStepInfo();
                    }
                }}
            >
                <Form.Item
                    label="Qual número máximo de animais que podem ser acomodados
                    simultaneamente?"
                    required
                >
                    <div className={styles.inputGrid}>
                        <Form.Item label="Número de cachorros:" name="dogQty">
                            <InputNumber
                                style={{ width: "100%" }}
                                size="large"
                                min={0}
                                max={500}
                                placeholder="00"
                                onChange={handleFieldChange}
                            />
                        </Form.Item>
                        <Form.Item label="Número de gatos:" name="catQty">
                            <InputNumber
                                style={{ width: "100%" }}
                                size="large"
                                min={0}
                                max={500}
                                placeholder="00"
                                onChange={handleFieldChange}
                            />
                        </Form.Item>
                        <Form.Item label="Número de coelhos:" name="rabbitQty">
                            <InputNumber
                                style={{ width: "100%" }}
                                size="large"
                                min={0}
                                max={500}
                                placeholder="00"
                                onChange={handleFieldChange}
                            />
                        </Form.Item>
                        <Form.Item label="Número de pássaros:" name="birdQty">
                            <InputNumber
                                style={{ width: "100%" }}
                                size="large"
                                min={0}
                                max={500}
                                placeholder="00"
                                onChange={handleFieldChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Número de outros animais:"
                            name="otherQty"
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                size="large"
                                min={0}
                                max={500}
                                placeholder="00"
                                onChange={handleFieldChange}
                            />
                        </Form.Item>
                    </div>
                    {!isAnyFieldFilled && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                            Preencha ao menos um dos campos de quantidade.
                        </p>
                    )}
                </Form.Item>

                <Form.Item
                    label="Quais são os dias em que a organização fica aberta para o
                    público?"
                    name={""}
                    rules={[
                        {
                            required: true,
                            message: "Selecione ao menos uma opção",
                        },
                    ]}
                >
                    <div className={styles.checkboxGrid}>
                        <Checkbox.Group
                            name={"operatingDays"}
                            value={answers.operatingDays}
                            options={daysOfWeekOptions}
                            onChange={(value) => {
                                handleChange({ operatingDays: [...value] });
                            }}
                        />
                    </div>
                </Form.Item>
                <Form.Item label="Em qual horário?" required>
                    <div className={styles.timeGrid}>
                        <Form.Item
                            name="openingTime"
                            rules={[
                                {
                                    required: true,
                                    message: "Insira o horário de abertura",
                                },
                            ]}
                        >
                            <TimePicker
                                format={{
                                    format: "HH:mm",
                                    type: "mask",
                                }}
                                size="large"
                                placeholder="Horário"
                            ></TimePicker>
                        </Form.Item>
                        <p>às</p>
                        <Form.Item
                            name="closingTime"
                            rules={[
                                {
                                    required: true,
                                    message: "Insira o horário de fechamento",
                                },
                            ]}
                        >
                            <TimePicker
                                format={{
                                    format: "HH:mm",
                                    type: "mask",
                                }}
                                size="large"
                                placeholder="Horário"
                            ></TimePicker>
                        </Form.Item>
                    </div>
                </Form.Item>

                <div className={styles.callToAction}>
                    <Form.Item>
                        <Button
                            style={{ color: `var(--color01)` }}
                            type="secondary"
                            size="large"
                            icon={<i class="ri-arrow-left-line"></i>}
                            onClick={prevStep}
                        >
                            Voltar
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ width: "100%" }}>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={loading}
                        >
                            Continuar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
