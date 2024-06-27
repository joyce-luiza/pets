import { React, useState } from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { axiosRequest } from "../../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../../utils/Message";
const { TextArea } = Input;

export default function RequestVisit({
    adopterId,
    organizationId,
    open,
    setIsModalOpen,
}) {
    const [form] = Form.useForm();
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [notes, setNotes] = useState("");

    const handleOk = async () => {
        try {
            await axiosRequest({
                method: "post",
                path: `/visit/`,
                body: {
                    adopterId: adopterId,
                    organizationId: organizationId,
                    appointmentDateTime: appointmentDateTime,
                    notes: notes,
                },
                authenticated: true,
            });
            showMessage("success", "Visita solicitada com sucesso!");
            setIsModalOpen(false);
        } catch (error) {
            showMessage("error", error.message || error);
        }
    };

    const handleClose = () => {
        setAppointmentDateTime(null);
        setNotes("");
        form.resetFields();
        setIsModalOpen(false);
    };

    const disabledDate = (current) => {
        return current && current < moment().startOf("day");
    };

    const handleDateChange = (date) => {
        setAppointmentDateTime(date ? date.format("YYYY-MM-DD HH:mm:ss") : "");
    };

    return (
        <Modal
            title="Solicitar visita"
            open={open}
            onOk={handleOk}
            onCancel={handleClose}
            cancelText={"Cancelar"}
            okText={"Solicitar visita"}
        >
            <Form
                form={form}
                onFinish={handleOk}
                layout="vertical"
                style={{ marginTop: "2em", marginBottom: "3em" }}
            >
                <Form.Item
                    label="Data da visita"
                    name="appointmentDateTime"
                    rules={[
                        {
                            required: true,
                            message: "Selecione um dia e horário",
                        },
                    ]}
                >
                    <DatePicker
                        showTime
                        disabledDate={disabledDate}
                        onChange={handleDateChange}
                        format="DD/MM/YYYY HH:mm"
                        placeholder="Selecione uma data e horário"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    label="Motivo da visita"
                    name="notes"
                    rules={[
                        {
                            required: true,
                            message: "Insira um motivo para a visita",
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        onChange={(e) => setNotes(e.target.value)}
                        maxLength={250}
                        showCount
                        style={{ resize: "none" }}
                        value={notes}
                        size="large"
                        placeholder="Use este espaço para especificar o objetivo da visita e orientações ao adotante"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
