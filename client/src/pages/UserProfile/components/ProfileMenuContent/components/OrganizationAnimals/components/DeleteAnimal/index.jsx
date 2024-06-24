import React from 'react';
import { Form, Modal, Typography, Button } from 'antd';
import { axiosRequest } from '../../../../../../../../utils/axiosRequest';
import showMessage from '../../../../../../../../utils/Message';

const { Paragraph } = Typography;

export default function DeleteAnimal({
  animalData,
  open,
  setIsModalOpen,
  handleGetTableData,
}) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      await axiosRequest({
        method: 'DELETE',
        authenticated: true,
        path: `/animals/${animalData.id}`,
      });
      showMessage('success', 'Registro excluído com sucesso');
      handleGetTableData(); // Atualiza a tabela após a exclusão
      setIsModalOpen(false);
    } catch (error) {
      showMessage('error', 'Erro ao excluir registro');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Excluir"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Confirmar
        </Button>,
      ]}
    >
      <div>
        <Paragraph>Confirma a exclusão do registro do animal?</Paragraph>
      </div>
    </Modal>
  );
}
