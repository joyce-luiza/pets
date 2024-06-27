import { React } from "react";
import { Modal, Typography, Flex } from "antd";
import moment from "moment";
import { RESULTS } from "../../../../../../../../constants";
import ResultTag from "../../../../../../../../components/ResultTag";
const { Paragraph } = Typography;

export default function VisitDetails({ visit, open, setIsModalOpen }) {
    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Detalhes da visita"
            open={open}
            onOk={handleClose}
            okText={"Fechar"}
            footer={(_, { OkBtn }) => (
                <>
                    <OkBtn />
                </>
            )}
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
                        <label>Email do adotante</label>
                        <Paragraph>{visit.adopterEmail} </Paragraph>
                    </Flex>
                    <Flex vertical gap={8}>
                        <label>Status</label>
                        <Paragraph>
                            <ResultTag result={RESULTS[visit.result]} />
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
                </Flex>
            )}
        </Modal>
    );
}
