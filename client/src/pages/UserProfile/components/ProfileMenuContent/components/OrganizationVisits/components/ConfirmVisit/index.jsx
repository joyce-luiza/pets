import { React, useState } from "react";
import { Modal, Typography, Flex, Form, Radio } from "antd";
import moment from "moment";
import { RESULTS } from "../../../../../../../../constants";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";
const { Paragraph } = Typography;

export default function ConfirmVisit({ visit, open, setIsModalOpen }) {
    const [form] = Form.useForm();
    const [result, setResult] = useState("");

    const handleOk = async () => {
        try {
            await axiosRequest({
                method: "put",
                path: `/visit/`,
                body: {
                    id: visit.id,
                    result: result,
                },
                authenticated: true,
            });
            showMessage("success", "Resposta enviada com sucesso!");
            setIsModalOpen(false);
        } catch (error) {
            showMessage("error", error.message || error);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Avaliar visita"
            open={open}
            onOk={handleOk}
            onCancel={handleClose}
            cancelText={"Cancelar"}
            okText={"Avaliar visita"}
        >
            {open && (
                <Flex style={{ margin: "24px 0" }} vertical>
                    <Flex vertical>
                        <label>Nome do adotante</label>
                        <Paragraph>
                            {visit.adopterFirstName} {visit.adopterLastName}
                        </Paragraph>
                    </Flex>
                    <Flex vertical>
                        <label>Data marcada</label>
                        <Paragraph>
                            {" "}
                            {moment(visit.createdAt).format("DD/MM/YYYY")}
                        </Paragraph>
                    </Flex>
                    <Flex vertical>
                        <label>Motivo da visita</label>
                        <Paragraph>{visit.notes}</Paragraph>
                    </Flex>
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            label="Resposta"
                            name="result"
                            rules={[
                                {
                                    required: true,
                                    message: "Selecione uma resposta",
                                },
                            ]}
                        >
                            <Radio.Group
                                onChange={(e) => setResult(e.target.value)}
                                value={result}
                            >
                                <Radio value={"APPROVED"}>Aceitar</Radio>
                                <Radio value={"REJECTED"}>Recusar</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Flex>
            )}
        </Modal>
    );
}
