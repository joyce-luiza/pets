import { React } from "react";
import { Typography, Flex, Button, Tabs } from "antd";
import OrganizationInfo from "./components/OrganizationInfo";
import OrganizationAddress from "./components/OrganizationAddress";
const { Title } = Typography;

export default function UpdateOrganizationData({
    setEditOrganization,
    address,
    setAddress,
    orgData,
    setOrgData,
}) {
    const items = [
        {
            key: "1",
            label: (
                <span data-cy="tab-organization-info">Informações gerais</span>
            ),
            children: (
                <OrganizationInfo
                    orgData={orgData}
                    setOrgData={setOrgData}
                ></OrganizationInfo>
            ),
        },
        {
            key: "2",
            label: <span data-cy="tab-organization-address">Endereço</span>,
            children: (
                <OrganizationAddress
                    address={address}
                    setAddress={setAddress}
                ></OrganizationAddress>
            ),
        },
    ];

    return (
        <div>
            <Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: 48 }}
            >
                <Title level={2} style={{ margin: 0, textAlign: "left" }}>
                    Editar organização
                </Title>
                <Button
                    icon={<i class="ri-arrow-left-line"></i>}
                    type="default"
                    onClick={() => setEditOrganization(false)}
                >
                    Voltar
                </Button>
            </Flex>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}
