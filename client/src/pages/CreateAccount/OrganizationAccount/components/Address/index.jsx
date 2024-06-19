import React, { useState } from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { axiosRequest } from "../../../../../utils/axiosRequest";
import { BRAZILIAN_STATES } from "../../../../../constants";
import CepField from "../../../../../components/CepField";
import styles from "../../styles.module.css";

const { Title, Paragraph } = Typography;

export default function Address({
  answers,
  updateAnswers,
  prevStep,
  nextStep,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [cities, setCities] = useState([]);

  const handleUserAddress = async (value) => {
    const cep = value.cep ? value.cep.replace(/[-_]/g, "") : false;

    if (cep && cep.length === 8) {
      setLoading(true);
      const address = await axiosRequest({
        basePath: false,
        path: `https://viacep.com.br/ws/${cep}/json/`,
      });

      if (address) {
        form.setFieldsValue({
          cep: value.cep.replace("-", ""),
          street: address.logradouro,
          city: address.localidade,
          state: address.uf,
        });
        handleCities(address.uf);
        updateAnswers((prev) => ({
          ...prev,
          cep: value.cep.replace("-", ""),
          street: address.logradouro,
          city: address.localidade,
          state: address.uf,
        }));
        setLoading(false);
        return;
      }
    }

    updateAnswers((prev) => ({
      ...prev,
      ...value,
    }));
    return;
  };

  const handleCities = async (uf) => {
    setLoading(true);
    const cities = uf
      ? await axiosRequest({
          basePath: false,
          path: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
        })
      : [];

    const citiesName = cities.map((city) => city.nome);
    citiesName.sort();
    setCities(() => citiesName);
    setLoading(false);
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

  return (
    <>
      <div className={styles.stepFormTitle}>
        <div>
          <i className="ri-home-4-line ri-2x"></i>
          <Title level={3} style={{ margin: 0 }}>
            Endereço
          </Title>
        </div>
        <Paragraph style={{ margin: "1em 0 2em 0" }}>
          Agora, vamos coletar informações sobre o endereço da sua organização.
          Isso nos ajudará a entender a localização e área de atuação.
        </Paragraph>
      </div>
      <Form
        className={styles.stepInput}
        form={form}
        initialValues={answers}
        onFinish={handleStepInfo}
      >
        <div className={styles.inline}>
          <CepField
            value={answers.cep}
            onChange={(e) => handleUserAddress({ cep: e.target.value })}
            data-cy="organization-cep"
          ></CepField>
          <Form.Item
            label="Logradouro:"
            name="street"
            rules={[
              {
                required: true,
                message: "Por favor, insira o logradouro.",
              },
            ]}
            labelCol={{ span: 24 }}
            data-cy="organization-street"
          >
            <Input
              size="large"
              placeholder="Digite o logradouro aqui"
              onChange={(e) => handleUserAddress({ street: e.target.value })}
            />
          </Form.Item>
        </div>

        <div className={styles.threeInline}>
          <Form.Item
            label="Estado:"
            name="state"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o estado.",
              },
            ]}
            labelCol={{ span: 24 }}
            data-cy="organization-state"
          >
            <Select
              size="large"
              placeholder="Selecione o estado"
              onChange={(value) => {
                handleCities("");
                handleUserAddress({ state: value });
                handleCities(value);
              }}
              data-cy="organization-state"
            >
              {Object.keys(BRAZILIAN_STATES).map((key) => (
                <Select.Option key={key} value={key}>
                  {BRAZILIAN_STATES[key]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Cidade:"
            name="city"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a cidade.",
              },
            ]}
            labelCol={{ span: 24 }}
            data-cy="organization-city"
          >
            <Select
              size="large"
              placeholder="Selecione a cidade"
              onChange={(value) => {
                handleUserAddress({ city: value });
              }}
            >
              {cities.length &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Número:"
            name="number"
            rules={[
              {
                required: true,
                message: "Por favor, insira o número da residência.",
              },
            ]}
            labelCol={{ span: 24 }}
            data-cy="organization-number"
          >
            <Input
              size="large"
              placeholder="Digite o número da residência"
              onChange={(e) => {
                handleUserAddress({ number: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Complemento (Opcional):"
          name="complemento"
          labelCol={{ span: 24 }}
          data-cy="organization-complement"
        >
          <Input
            size="large"
            placeholder="Digite o complemento (opcional)"
            onChange={(e) => {
              handleUserAddress({ complement: e.target.value });
            }}
          />
        </Form.Item>
        <div className={styles.callToAction}>
          <Form.Item>
            <Button
              style={{ color: `var(--color01)` }}
              type="secondary"
              size="large"
              icon={<i className="ri-arrow-left-line"></i>}
              onClick={prevStep}
            >
              Voltar
            </Button>
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
              data-cy="next-step-button"
            >
              Continuar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
