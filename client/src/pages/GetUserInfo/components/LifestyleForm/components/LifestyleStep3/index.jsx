import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form, Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ROUTINE_TYPES, TRAVEL_FREQUENCY } from "../../../../../../constants";

export default function LifestyleStep3({
    title,
    description,
    handler,
    previousStep,
    answers,
    setStepLoading,
    nextStep,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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

    const handleUserPreferences = (value) => {
        handler("lifestyle", value);
    };

    const setPreferencesByPreviousAnswers = () => {
        if (answers) {
            const formFieldValues = {};

            Object.keys(answers).forEach((key) => {
                const value = answers[key];
                if (value) {
                    formFieldValues[key] = answers[key];
                }
            });

            form.setFieldsValue(formFieldValues);
        }
    };
    useEffect(() => {
        setPreferencesByPreviousAnswers();
        setStepLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setStepLoading]);
    return (
        <div className={styles.container}>
            <div className={styles.stepHeader}>
                <div className={styles.stepTitle}>
                    <i className="ri-open-arm-line ri-2x"></i>{" "}
                    <span>{title}</span>
                </div>
                <span>{description}</span>
            </div>
            <>
                <Form className={styles.stepInput} form={form}>
                    <Form.Item
                        label="Você já possui outros pets? Se sim, quantos?"
                        labelCol={{ span: 24 }}
                        name="petsQuantity"
                        initialValue={null}
                        rules={[
                            {
                                required: true,
                                message: "Por favor, selecione uma opção.",
                            },
                        ]}
                    >
                        <Radio.Group
                            name="petsQuantity"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                handleUserPreferences({
                                    petsQuantity: e.target.value,
                                })
                            }
                        >
                            <Radio key="PQ0" value={0}>
                                Sim, possuo 1 pet
                            </Radio>
                            <Radio key="PQ1" value={1}>
                                Sim, possuo 2 pets
                            </Radio>
                            <Radio key="PQ2" value={2}>
                                Sim, possuo 3 pets
                            </Radio>
                            <Radio key="PQ3" value={3}>
                                Sim, possuo 4 pets ou mais
                            </Radio>
                            <Radio key="PQ4" value={4}>
                                Não possuo outros pets
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Qual é a sua rotina diária em termos de horários de trabalho e atividades fora de casa?"
                        labelCol={{ span: 24 }}
                        name="routine"
                        initialValue={null}
                        rules={[
                            {
                                required: true,
                                message: "Por favor, selecione uma opção.",
                            },
                        ]}
                    >
                        <Radio.Group
                            name="routine"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                handleUserPreferences({
                                    routine: e.target.value,
                                })
                            }
                        >
                            <Radio
                                key={ROUTINE_TYPES.FULL_TIME}
                                value={ROUTINE_TYPES.FULL_TIME}
                            >
                                Trabalho em período integral, raramente em casa.
                            </Radio>
                            <Radio
                                key={ROUTINE_TYPES.FLEXIBLE}
                                value={ROUTINE_TYPES.FLEXIBLE}
                            >
                                Horário flexível, posso passar tempo em casa
                                durante o dia.
                            </Radio>
                            <Radio
                                key={ROUTINE_TYPES.AVAILABLE}
                                value={ROUTINE_TYPES.AVAILABLE}
                            >
                                Trabalho em casa, disponível para interação com
                                o pet o dia todo.
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Com que frequência você viaja?"
                        labelCol={{ span: 24 }}
                        name="travelFrequency"
                        initialValue={null}
                        rules={[
                            {
                                required: true,
                                message: "Por favor, selecione uma opção.",
                            },
                        ]}
                    >
                        <Radio.Group
                            name="travelFrequency"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                handleUserPreferences({
                                    travelFrequency: e.target.value,
                                })
                            }
                        >
                            <Radio
                                key={TRAVEL_FREQUENCY.REGULAR}
                                value={TRAVEL_FREQUENCY.REGULAR}
                            >
                                Regularmente, por longos períodos.
                            </Radio>
                            <Radio
                                key={TRAVEL_FREQUENCY.OCCASIONALLY}
                                value={TRAVEL_FREQUENCY.OCCASIONALLY}
                            >
                                Ocasionalmente, por curtos períodos.
                            </Radio>
                            <Radio
                                key={TRAVEL_FREQUENCY.RARELLY}
                                value={TRAVEL_FREQUENCY.RARELLY}
                            >
                                Raramente viajo.
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>

                <div className={styles.formActions}>
                    <Button
                        size="large"
                        className={styles.nextBtn}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        onClick={handleStepInfo}
                    >
                        Finalizar
                    </Button>
                    <Button
                        size="large"
                        className={styles.backBtn}
                        type="link"
                        htmlType="submit"
                        icon={<ArrowLeftOutlined />}
                        onClick={previousStep}
                    >
                        Voltar
                    </Button>
                </div>
            </>
        </div>
    );
}
