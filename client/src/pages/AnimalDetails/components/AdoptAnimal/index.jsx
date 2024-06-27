import { React, useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Modal, Typography } from "antd";
import { axiosRequest } from "../../../../utils/axiosRequest";
import showMessage from "../../../../utils/Message";

const { Text } = Typography;

export default function AdoptAnimal({ open, setIsModalOpen, animalId }) {
    const [notes, setNotes] = useState("");

    const handleOk = async () => {
        try {
            await axiosRequest({
                method: "post",
                path: `/adoption`,
                body: {
                    animalId: animalId,
                    notes: notes,
                },
                authenticated: true,
            });
            setIsModalOpen(false);
            showMessage("success", "A organização foi notificada!");
        } catch (error) {
            showMessage("error", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Quero adotar"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="cancel"
                    size="large"
                    onClick={handleCancel}
                    data-cy="modal-cancel-button"
                >
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    size="large"
                    type="primary"
                    data-cy="modal-submit-button"
                    onClick={handleOk}
                >
                    Quero adotar
                </Button>,
            ]}
        >
            <Text>
                Ao expressar interesse em adotar, a organização responsável pelo
                pet será notificada e analisará as informações disponíveis no
                seu perfil. Além disso, ao prosseguir com essa ação, você
                autoriza que seus dados de contato (email e telefone) fiquem
                visíveis para a organização.
            </Text>
            <Form
                layout="vertical"
                style={{ width: "100%", marginTop: 24, marginBottom: 40 }}
            >
                <Form.Item name="notes" label="Motivo do interesse">
                    <Input.TextArea
                        placeholder="Você pode usar este espaço para explicar o por quê você gostaria de adotar o pet"
                        maxLength={250}
                        showCount
                        style={{ height: "100px", resize: "none" }}
                        size="large"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    );
}
