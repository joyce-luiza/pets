import { React, useState } from "react";
import { Button, Form, Input } from "antd";
import CnpjField from "../../../../../../../../../../components/CnpjField";
import PhoneNumberField from "../../../../../../../../../../components/PhoneNumberField";
import showMessage from "../../../../../../../../../../utils/Message";
import { axiosRequest } from "../../../../../../../../../../utils/axiosRequest";

export default function OrganizationInfo({ orgData, setOrgData }) {
    const [updatedOrgData, setUpdatedOrgData] = useState(orgData);
    const [loading, setLoading] = useState(false);

    const handleOrgData = (value) => {
        setUpdatedOrgData((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const updateOrgData = async () => {
        setLoading(true);
        try {
            const org = await axiosRequest({
                method: "put",
                path: `/organization/`,
                body: { ...updatedOrgData },
                authenticated: true,
            });
            setOrgData(org);
            showMessage("success", "Organização editada com sucesso!");
            setLoading(false);
        } catch (error) {
            showMessage("error", error);
            setLoading(false);
        }
    };

    return (
        <Form
            layout="vertical"
            style={{ width: "100%", marginTop: 32 }}
            initialValues={orgData}
            onValuesChange={(value) => handleOrgData(value)}
            onFinish={updateOrgData}
        >
            <Form.Item
                label="Nome da organização:"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Insira o nome da organização",
                    },
                ]}
            >
                <Input size="large" placeholder="Nome da organização" />
            </Form.Item>
            <CnpjField></CnpjField>
            <Form.Item
                label="Email:"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Insira um email",
                    },
                ]}
            >
                <Input size="large" placeholder="Email" />
            </Form.Item>
            <PhoneNumberField></PhoneNumberField>

            <Form.Item
                label="Descrição:"
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Insira uma descrição",
                    },
                ]}
            >
                <Input.TextArea placeholder="Descrição da organização" />
            </Form.Item>
            <Form.Item style={{ width: "100%" }}>
                <Button
                    style={{ width: "100%" }}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                >
                    Editar informações gerais
                </Button>
            </Form.Item>
        </Form>
    );
}
