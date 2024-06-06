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
            label: "Informações gerais",
            children: (
                <OrganizationInfo
                    orgData={orgData}
                    setOrgData={setOrgData}
                ></OrganizationInfo>
            ),
        },
        {
            key: "2",
            label: "Endereço",
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
                <Title level={1} style={{ margin: 0 }}>
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
