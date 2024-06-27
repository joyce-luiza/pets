import { Button, Form, Radio } from "antd";
import styles from "./styles.module.css";
import { ROUTINE_TYPES, TRAVEL_FREQUENCY } from "../../../../../../constants";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../utils/Message";

export default function ChangeAdopterLifestyle({ user }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [lifestyle, setLifestyle] = useState({
    totalPets: null,
    routine: null,
    travelFrequency: null,
  });

  const [newLifestyle, setNewLifestyle] = useState({
    totalPets: null,
    routine: null,
    travelFrequency: null,
  });

  const handleAdopterLifestyle = (value) => {
    setNewLifestyle((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const handleGetAdopterLifestyle = async () => {
    setLoading(true);
    try {
      const result = await axiosRequest({
        authenticated: true,
        method: "GET",
        path: "/adopter/lifestyle",
      });

      setLifestyle(result);
    } catch (error) {
      showMessage("error", error);
    }
    setLoading(false);
    setFormReady(true);
  };

  const handleUpdateAdopterLifestyle = async () => {
    setLoading(true);
    try {
      await axiosRequest({
        authenticated: true,
        method: "PUT",
        path: "/adopter/lifestyle",
        body: newLifestyle,
      });

      showMessage("success", "Estilo de vida atualizado com sucesso");
    } catch (error) {
      showMessage("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAdopterLifestyle();
  }, []);

  useEffect(() => {
    if (formReady) {
      form.setFieldsValue(lifestyle);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifestyle, formReady]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Estilo de vida</h2>

      <Form form={form} onFinish={handleUpdateAdopterLifestyle}>
        <Form.Item
          className={styles.item}
          label="Você já possui outros pets? Se sim, quantos?"
          labelCol={{ span: 24 }}
          name="totalPets"
          initialValue={null}
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
          onChange={(e) =>
            handleAdopterLifestyle({
              totalPets: Number(e.target.value),
            })
          }
        >
          <Radio.Group
            className={styles.group}
            name="totalPets"
            style={{ width: "100%" }}
          >
            <div className={styles.column}>
              <Radio key="PQ0" value={0}>
                Sim, possuo 1 pet
              </Radio>
              <Radio key="PQ2" value={2}>
                Sim, possuo 3 pets
              </Radio>
              <Radio key="PQ4" value={4}>
                Não possuo outros pets
              </Radio>
            </div>
            <div className={styles.column}>
              <Radio key="PQ1" value={1}>
                Sim, possuo 2 pets
              </Radio>
              <Radio key="PQ3" value={3}>
                Sim, possuo 4 pets ou mais
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          className={styles.item}
          label="Qual é a sua rotina diária em termos de horários de trabalho e atividades fora de casa?"
          labelCol={{ span: 24 }}
          name="routine"
          initialValue={null}
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
          onChange={(e) =>
            handleAdopterLifestyle({
              routine: e.target.value,
            })
          }
        >
          <Radio.Group
            className={styles.group}
            name="routine"
            style={{ width: "100%" }}
          >
            <div className={styles.column}>
              <Radio
                key={ROUTINE_TYPES.FULL_TIME}
                value={ROUTINE_TYPES.FULL_TIME}
              >
                Trabalho em período integral, raramente em casa.
              </Radio>
              <Radio
                key={ROUTINE_TYPES.FLEXIBLE}
                value={ROUTINE_TYPES.FLEXIBLE}
              >
                Horário flexível, posso passar tempo em casa durante o dia.
              </Radio>
              <Radio
                key={ROUTINE_TYPES.AVAILABLE}
                value={ROUTINE_TYPES.AVAILABLE}
              >
                Trabalho em casa, disponível para interação com o pet o dia
                todo.
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          className={styles.item}
          label="Com que frequência você viaja?"
          labelCol={{ span: 24 }}
          name="travelFrequency"
          initialValue={null}
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
          onChange={(e) =>
            handleAdopterLifestyle({
              travelFrequency: e.target.value,
            })
          }
        >
          <Radio.Group name="travelFrequency" style={{ width: "100%" }}>
            <div className={styles.column}>
              <Radio
                key={TRAVEL_FREQUENCY.REGULAR}
                value={TRAVEL_FREQUENCY.REGULAR}
              >
                Regularmente, por longos períodos.
              </Radio>
              <Radio
                key={TRAVEL_FREQUENCY.OCCASIONALLY}
                value={TRAVEL_FREQUENCY.OCCASIONALLY}
              >
                Ocasionalmente, por curtos períodos.
              </Radio>
              <Radio
                key={TRAVEL_FREQUENCY.RARELLY}
                value={TRAVEL_FREQUENCY.RARELLY}
              >
                Raramente viajo.
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        <Button
          className={styles.formBtn}
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Atualizar estilo de vida
        </Button>
      </Form>
    </div>
  );
}
