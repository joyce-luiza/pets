import React, { useState } from "react";
import { Modal, Radio, Input, Form } from "antd";
import { RESULTS } from "../../../../../../../../../constants";
import showMessage from "../../../../../../../../../utils/Message";
import { axiosRequest } from "../../../../../../../../../utils/axiosRequest";
const { TextArea } = Input;

const ApproveAdoption = ({
    adoptionId,
    open,
    setIsModalOpen,
    updateAdoptionDetails,
}) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState("");
    const [organizationReply, setOrganizationReply] = useState("");

    const handleOk = async () => {
        try {
            await axiosRequest({
                method: "put",
                path: `/adoption/`,
                body: {
                    id: adoptionId,
                    result: result,
                    organizationReply: organizationReply,
                },
                authenticated: true,
            });
            showMessage("success", "Adoção avaliada com sucesso!");
            setIsModalOpen(false);
            updateAdoptionDetails();
        } catch (error) {
            showMessage("error", error.message || error);
        }
    };

    const handleCancel = () => {
        setResult("");
        setOrganizationReply("");
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Avaliar Adoção"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"Avaliar"}
            cancelText={"Cancelar"}
        >
            <div>
                <Form form={form} onFinish={handleOk} layout="vertical">
                    <Form.Item
                        label="Avaliação"
                        name="result"
                        rules={[
                            {
                                required: true,
                                message: "Selecione uma avaliação",
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={(e) => setResult(e.target.value)}
                            value={result}
                        >
                            <Radio value={"APPROVED"}>Aprovado</Radio>
                            <Radio value={"REJECTED"}>Reprovado</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Justificativa/Instruções para o adotante"
                        name="organizationReply"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Insira uma justificativa/instrução para o adotante",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            onChange={(e) =>
                                setOrganizationReply(e.target.value)
                            }
                            value={organizationReply}
                            placeholder="Use este espaço para descrever quais são os próximos passos da adoção ou o motivo pelo qual a adoção não pôde ser aprovada."
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ApproveAdoption;
