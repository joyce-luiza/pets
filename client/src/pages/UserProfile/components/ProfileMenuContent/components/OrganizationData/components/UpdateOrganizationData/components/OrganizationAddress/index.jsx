import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { axiosRequest } from "../../../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../../../utils/Message";
import { BRAZILIAN_STATES } from "../../../../../../../../../../constants";
import CepField from "../../../../../../../../../../components/CepField";

export default function OrganizationAddress({ address, setAddress }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [updatedAddress, setUpdatedAddress] = useState(address);

    const updateAddress = async () => {
        setLoading(true);
        try {
            const address = await axiosRequest({
                method: "put",
                path: `/organization/address`,
                body: { ...updatedAddress },
                authenticated: true,
            });
            setAddress(address);
            showMessage("success", "Endereço editado com sucesso!");
            setLoading(false);
        } catch (error) {
            showMessage("error", error);
            setLoading(false);
        }
    };

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
                setUpdatedAddress((prev) => ({
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

        setUpdatedAddress((prev) => ({
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

    return (
        <>
            <Form
                form={form}
                initialValues={address}
                onFinish={updateAddress}
                style={{ marginTop: 32 }}
            >
                <CepField
                    value={address.cep}
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
                >
                    <Input
                        size="large"
                        placeholder="Digite o logradouro aqui"
                        onChange={(e) =>
                            handleUserAddress({ street: e.target.value })
                        }
                        data-cy="organization-street"
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
                >
                    <Select
                        size="large"
                        placeholder="Selecione a cidade"
                        onChange={(value) => {
                            handleUserAddress({ city: value });
                        }}
                        data-cy="organization-city"
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
                            message:
                                "Por favor, insira o número da residência.",
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
                        data-cy="organization-number"
                    />
                </Form.Item>
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
                        data-cy="organization-complement"
                    />
                </Form.Item>

                <Form.Item style={{ width: "100%" }}>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ width: "100%" }}
                        data-cy="submit-update-organization-address-button"
                    >
                        Editar endereço
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
