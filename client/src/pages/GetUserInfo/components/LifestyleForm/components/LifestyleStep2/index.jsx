import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import stepIcon from "../../../../../../assets/smile.svg";
import { Form, Checkbox, Row, Col, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import {
  ANIMAL_AGE_GROUPS,
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from "../../../../../../constants";

export default function LifestyleStep2({
  title,
  description,
  handler,
  previousStep,
  setStepLoading,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formReady, setFormReady] = useState(false);

  const [formOptions, setFormOptions] = useState({
    animalTypes: [],
    animalAgeGroups: [],
    animalSizes: [],
    animalColors: [],
  });

  const [userPreferences, setUserPreferences] = useState({
    animalTypes: {},
    animalAgeGroups: {},
    animalSizes: {},
    animalColors: {},
    animalSexes: {},
  });

  const handleStepInfo = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      handler("step2", userPreferences);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [anySelected, setAnySelected] = useState({
    animalTypes: false,
    animalAgeGroups: false,
    animalSizes: false,
    animalSexes: false,
    animalColors: false,
  });

  const sexOptions = [
    { label: "Macho", value: "MALE" },
    { label: "Fêmea", value: "FEMALE" },
  ];

  const handleUserPreferences = (value) => {
    setUserPreferences((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const handleCheckBoxAnswer = (group, selectedOptions) => {
    const result = {};

    for (const selectedOption of selectedOptions) {
      result[selectedOption] = true;
    }

    if (selectedOptions.includes(null)) {
      setAnySelected((prev) => ({ ...prev, [group]: true }));
      handleUserPreferences({ [group]: { ANY: true } });
      return;
    }

    setAnySelected((prev) => ({ ...prev, [group]: false }));
    handleUserPreferences({ [group]: result });
  };

  const getFormInfo = async () => {
    setLoading(true);

    const animalTypes = await axiosRequest({
      path: "/animalTypes/all",
    });

    const animalAgeGroups = await axiosRequest({
      path: "/animalAgeGroups/all",
    });

    const animalSizes = await axiosRequest({
      path: "/animalSizes/all",
    });

    const animalColors = await axiosRequest({
      path: "/animalColors/all",
    });

    setFormOptions((prev) => ({
      ...prev,
      animalTypes: animalTypes,
      animalAgeGroups: animalAgeGroups,
      animalSizes: animalSizes,
      animalColors: animalColors,
    }));

    setLoading(false);
    setFormReady(true);
  };

  useEffect(() => {
    getFormInfo();
    setStepLoading(false);
  }, [setStepLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.stepHeader}>
        <div className={styles.stepTitle}>
          <img src={stepIcon} alt="Endereço" />
          <span>{title}</span>
        </div>
        <span>{description}</span>
      </div>

      {formReady && (
        <>
          <Form className={styles.stepInput} form={form}>
            <Form.Item
              label="Qual tipo de animal você está procurando?"
              name="animalTypes"
              rules={[
                {
                  required: true,
                  message: "Selecione o(s) tipos de seu interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalTypes", value)}
              >
                <Row>
                  {formOptions.animalTypes.map((type) => (
                    <Col span={8} key={type.title}>
                      <Checkbox
                        value={type.title}
                        disabled={
                          anySelected.animalTypes && type.title !== "ANY"
                        }
                      >
                        {ANIMAL_TYPES[type.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"ANY"}>
                    <Checkbox value={null}>Sem preferência</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Qual faixa etária o pet deve possuir?"
              name="animalAgeGroups"
              rules={[
                {
                  required: true,
                  message: "Selecione a(s) faixa etária de interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) =>
                  handleCheckBoxAnswer("animalAgeGroups", value)
                }
              >
                <Row>
                  {formOptions.animalAgeGroups.map((age) => (
                    <Col span={8} key={age.title}>
                      <Checkbox
                        value={age.title}
                        disabled={
                          anySelected.animalAgeGroups && age.title !== "ANY"
                        }
                      >
                        {ANIMAL_AGE_GROUPS[age.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"ANY"}>
                    <Checkbox value={null}>Sem preferência</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Qual o tamanho de pet ideal para você?"
              name="animalSizes"
              rules={[
                {
                  required: true,
                  message: "Selecione o(s) tamanho de interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalSizes", value)}
              >
                <Row>
                  {formOptions.animalSizes.map((size) => (
                    <Col span={8} key={size.title}>
                      <Checkbox
                        value={size.title}
                        disabled={
                          anySelected.animalSizes && size.title !== "ANY"
                        }
                      >
                        {ANIMAL_SIZES[size.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"ANY"}>
                    <Checkbox value={null}>Sem preferência</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="De qual sexo o seu pet deve ser?"
              name="animalSex"
              rules={[
                {
                  required: true,
                  message: "Selecione o(s) tamanho de interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalSexes", value)}
              >
                <Row>
                  {sexOptions.map((gender) => (
                    <Col span={8} key={gender.value}>
                      <Checkbox
                        value={gender.value}
                        disabled={
                          anySelected.animalSexes && gender.value !== "ANY"
                        }
                      >
                        {gender.label}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"ANY"}>
                    <Checkbox value={null}>Sem preferência</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Há alguma cor específica que o seu pet deve ter?"
              name="animalColors"
              rules={[
                {
                  required: true,
                  message: "Selecione a(s) cores de interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) =>
                  handleCheckBoxAnswer("animalColors", value)
                }
              >
                <Row>
                  {formOptions.animalColors.map((color) => (
                    <Col span={8} key={color.title}>
                      <Checkbox
                        value={color.title}
                        disabled={
                          anySelected.animalColors && color.title !== "ANY"
                        }
                      >
                        {ANIMAL_COLORS[color.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"ANY"}>
                    <Checkbox value={null}>Sem preferência</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form>

          <div className={styles.formActions}>
            <Button
              className={styles.nextBtn}
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleStepInfo}
            >
              Continuar
            </Button>
            <Button
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
      )}
    </div>
  );
}
