import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Checkbox, Col, Form, Row } from "antd";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import {
  ANIMAL_AGE_GROUPS,
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from "../../../../../../constants";
import showMessage from "../../../../../../utils/Message";

export default function ChangeUserPreferences({ user }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formReady, setFormReady] = useState(false);

  const [preferences, setPreferences] = useState({
    animalTypes: null,
    animalAgeGroups: null,
    animalSizes: null,
    animalSexes: null,
    animalColors: null,
  });

  const [newPreferences, setNewPreferences] = useState({
    animalTypes: null,
    animalAgeGroups: null,
    animalSizes: null,
    animalSexes: null,
    animalColors: null,
  });

  const [formOptions, setFormOptions] = useState({
    animalTypes: [],
    animalAgeGroups: [],
    animalSizes: [],
    animalColors: [],
  });

  const handleUpdatePreferences = async () => {
    setLoading(true);
    await form.validateFields();
    try {
      await axiosRequest({
        authenticated: true,
        method: "PUT",
        path: "/adopter/preferences",
        body: newPreferences,
      });
      showMessage("success", "Preferências atualizadas com sucesso");
    } catch (error) {
      showMessage("error", error);
      setLoading(false);
    }
    setLoading(false);
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

  const handleCheckBoxAnswer = (group, selectedOptions) => {
    const result = {};

    for (const selectedOption of selectedOptions) {
      result[selectedOption] = true;
    }

    if (selectedOptions.includes("")) {
      setAnySelected((prev) => ({ ...prev, [group]: true }));
      setNewPreferences((prev) => ({ ...prev, [group]: null }));
      return;
    }

    setAnySelected((prev) => ({ ...prev, [group]: false }));
    setNewPreferences((prev) => ({ ...prev, [group]: result }));
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

  const setExistingUserPreferences = () => {
    if (preferences) {
      const formFieldValues = {};

      Object.keys(preferences).forEach((key) => {
        const value = preferences[key];
        if (
          typeof value === "object" &&
          value !== null &&
          Object.keys(value).length
        ) {
          formFieldValues[key] = Object.keys(value).filter(
            (subKey) => value[subKey]
          );
        } else {
          setAnySelected((prev) => ({ ...prev, [key]: true }));
          formFieldValues[key] = [""];
        }
      });

      form.setFieldsValue(formFieldValues);
      setNewPreferences(preferences);
    }
  };

  const getUserPreferences = async () => {
    setLoading(true);
    try {
      const result = await axiosRequest({
        authenticated: true,
        method: "GET",
        path: "/adopter/preferences",
      });

      setPreferences(result);
    } catch (error) {
      showMessage("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFormInfo();
    getUserPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formReady) {
      setExistingUserPreferences();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences, formReady]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preferências</h2>

      {formReady && (
        <>
          <Form form={form} onFinish={handleUpdatePreferences}>
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
                name="animalTypes"
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalTypes", value)}
              >
                <Row>
                  {formOptions.animalTypes.map((type) => (
                    <Col span={8} key={type.title}>
                      <Checkbox
                        name="animalTypes"
                        value={type.title}
                        disabled={anySelected.animalTypes}
                      >
                        {ANIMAL_TYPES[type.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"NULL"}>
                    <Checkbox value={""} name="animalTypes">
                      Sem preferência
                    </Checkbox>
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
                name="animalAgeGroups"
                style={{ width: "100%" }}
                onChange={(value) =>
                  handleCheckBoxAnswer("animalAgeGroups", value)
                }
              >
                <Row>
                  {formOptions.animalAgeGroups.map((age) => (
                    <Col span={8} key={age.title}>
                      <Checkbox
                        name="animalAgeGroups"
                        value={age.title}
                        disabled={
                          anySelected.animalAgeGroups && age.title !== "ANY"
                        }
                      >
                        {ANIMAL_AGE_GROUPS[age.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"NULL"}>
                    <Checkbox value={""} name="animalAgeGroups">
                      Sem preferência
                    </Checkbox>
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
                name="animalSizes"
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalSizes", value)}
              >
                <Row>
                  {formOptions.animalSizes.map((size) => (
                    <Col span={8} key={size.title}>
                      <Checkbox
                        name="animalSizes"
                        value={size.title}
                        disabled={
                          anySelected.animalSizes && size.title !== "ANY"
                        }
                      >
                        {ANIMAL_SIZES[size.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"NULL"}>
                    <Checkbox value={""} name="animalSizes">
                      Sem preferência
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="De qual sexo o seu pet deve ser?"
              name="animalSexes"
              rules={[
                {
                  required: true,
                  message: "Selecione o(s) tamanho de interesse",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group
                name="animalSexes"
                style={{ width: "100%" }}
                onChange={(value) => handleCheckBoxAnswer("animalSexes", value)}
              >
                <Row>
                  {sexOptions.map((sex) => (
                    <Col span={8} key={sex.value}>
                      <Checkbox
                        name="animalSexes"
                        value={sex.value}
                        disabled={
                          anySelected.animalSexes && sex.value !== "ANY"
                        }
                      >
                        {sex.label}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"NULL"}>
                    <Checkbox value={""} name="animalSexes">
                      Sem preferência
                    </Checkbox>
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
                name="animalColors"
                style={{ width: "100%" }}
                onChange={(value) =>
                  handleCheckBoxAnswer("animalColors", value)
                }
              >
                <Row>
                  {formOptions.animalColors.map((color) => (
                    <Col span={8} key={color.title}>
                      <Checkbox
                        name="animalColors"
                        value={color.title}
                        disabled={
                          anySelected.animalColors && color.title !== "ANY"
                        }
                      >
                        {ANIMAL_COLORS[color.title]}
                      </Checkbox>
                    </Col>
                  ))}
                  <Col span={8} key={"NULL"}>
                    <Checkbox value={""} name="animalColors">
                      Sem preferência
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Button
              size="large"
              className={styles.formBtn}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Atualizar preferências
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
