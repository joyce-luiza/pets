import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Form, Input, Select } from "antd";
import stepIcon from "../../../../../../assets/home.svg";
import MaskedInput from "../../../../../../components/MaskedInput";
import { BRAZILIAN_STATES, RESIDENCE_TYPE } from "../../../../../../constants";
import { axiosRequest } from "../../../../../../utils/axiosRequest";

export default function LifestyleStep1({
  title,
  description,
  handler,
  answers,
}) {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);
  const [userAddress, setUserAddress] = useState({
    residenceType: "",
    cep: "",
    number: "",
    street: "",
    city: "",
    state: "",
    complement: "",
  });
  const [loading, setLoading] = useState(false);

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
        setUserAddress((prev) => ({
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

    setUserAddress((prev) => ({
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
      handler("step1", userAddress);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepHeader}>
        <div className={styles.stepTitle}>
          <img src={stepIcon} alt="Endereço" />
          <span>{title}</span>
        </div>
        <span>{description}</span>
      </div>

      <Form className={styles.stepInput} form={form}>
        <Form.Item
          label="Tipo de residência:"
          name="residenceType"
          rules={[
            {
              required: true,
              message: "Selecione o seu tipo de residência",
            },
          ]}
          labelCol={{ span: 24 }}
        >
          <Select
            name={"residenceType"}
            size="large"
            placeholder="Selecione o seu tipo de residência"
            onChange={(value) => {
              handleUserAddress({ residenceType: value });
            }}
          >
            {Object.keys(RESIDENCE_TYPE).map((key) => (
              <Select.Option key={key} value={key}>
                {RESIDENCE_TYPE[key]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className={styles.inline}>
          <Form.Item
            label="CEP:"
            name="cep"
            rules={[
              {
                required: true,
                message: "Por favor, insira o CEP no formato 00000-000",
              },
            ]}
            labelCol={{ span: 24 }}
          >
            <MaskedInput
              id="cep"
              name="cep"
              mask="99999-999"
              placeholder="_____-___"
              size="large"
              value={answers ? answers.cep : userAddress.cep}
              onChange={(e) => handleUserAddress({ cep: e.target.value })}
            />
          </Form.Item>

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
          >
            <Input size="large" placeholder="Digite o logradouro aqui" />
          </Form.Item>
        </div>

        <div className={styles.threeInline}>
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
          >
            <Input
              size="large"
              placeholder="Digite o número da residência"
              onChange={(e) => {
                handleUserAddress({ number: e.target.value });
              }}
            />
          </Form.Item>

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
          >
            <Select
              size="large"
              placeholder="Selecione o estado"
              onChange={(value) => {
                handleCities("");
                handleUserAddress({ state: value });
                handleCities(value);
              }}
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
          >
            <Select size="large" placeholder="Selecione a cidade">
              {cities.length &&
                cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Complemento (Opcional):"
          name="complemento"
          labelCol={{ span: 24 }}
        >
          <Input
            size="large"
            placeholder="Digite o complemento (opcional)"
            onChange={(e) => {
              handleUserAddress({ complement: e.target.value });
            }}
          />
        </Form.Item>
      </Form>

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        onClick={handleStepInfo}
      >
        Continuar
      </Button>
    </div>
  );
}
