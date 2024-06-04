import { Button, DatePicker, Form, Input, Radio, Tooltip, Upload } from "antd";
import styles from "./styles.module.css";
import {
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from "../../../../../../../../constants";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import { axiosRequest } from "../../../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../../../utils/Message";
import moment from "moment";

export default function CreateAnimal({ setCreateAnimal }) {
  const [animalForm, setAnimalForm] = useState({
    type: "",
    sex: "",
    name: "",
    birthDate: "",
    size: "",
    color: "",
    description: "",
    medicalInformation: "",
    status: "",
  });

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (property, value) => {
    setAnimalForm((prev) => ({ ...prev, [property]: value }));
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    handleFormChange("birthDate", formattedDate);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  const handleCreateAnimal = async () => {
    try {
      setLoading(true);

      if (!fileList.length) {
        throw new Error("Nenhuma foto foi anexada");
      }

      const formData = new FormData();
      Object.keys(animalForm).forEach((key) => {
        formData.append(key, animalForm[key]);
      });
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      await axiosRequest({
        method: "POST",
        authenticated: true,
        body: formData,
        path: "/animals",
        type: "multipart",
      });
      setCreateAnimal(false);
      showMessage("success", "Animal criado com sucesso");
    } catch (error) {
      showMessage("error", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip
        onClick={() => setCreateAnimal(() => false)}
        title="Retornar à lista"
      >
        <Button className={styles.backBtn} size="medium" type="link">
          <i className="ri-arrow-left-line ri-xl"></i>
          <span>Voltar</span>
        </Button>
      </Tooltip>
      <h2 className={styles.title}>Cadastrar animal</h2>

      <div className={styles.formContainer}>
        <div className={styles.form}>
          <Form>
            <Form.Item
              label="Tipo de animal"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Selecione o tipos do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => handleFormChange("type", e.target.value)}
              >
                {Object.keys(ANIMAL_TYPES).map((key) => {
                  if (key !== "ANY") {
                    return <Radio value={key}>{ANIMAL_TYPES[key]}</Radio>;
                  } else return <></>;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Sexo do animal"
              name="sex"
              rules={[
                {
                  required: true,
                  message: "Selecione o sexo do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => handleFormChange("sex", e.target.value)}
              >
                <Radio value={"FEMALE"}>Fêmea</Radio>
                <Radio value={"MALE"}>Macho</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Nome"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Insira o nome do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input
                onChange={(e) => handleFormChange("name", e.target.value)}
                size="large"
                placeholder="Nome completo"
              ></Input>
            </Form.Item>

            <Form.Item
              name="birthDate"
              label="Data de nascimento"
              rules={[
                {
                  required: true,
                  message: "Insira a data de nascimento do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <DatePicker
                onChange={handleDateChange}
                style={{ width: "100%" }}
                size="large"
                format={{
                  format: "DD/MM/YYYY",
                  type: "mask",
                }}
                placeholder="XX/XX/XXXX"
              />
            </Form.Item>

            <Form.Item
              label="Porte do animal"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Selecione o porte do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => handleFormChange("size", e.target.value)}
              >
                {Object.keys(ANIMAL_SIZES).map((key) => {
                  if (key !== "ANY") {
                    return <Radio value={key}>{ANIMAL_SIZES[key]}</Radio>;
                  } else return <></>;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Cor do animal"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Selecione o porte do animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => handleFormChange("color", e.target.value)}
              >
                {Object.keys(ANIMAL_COLORS).map((key) => {
                  if (key !== "ANY") {
                    return <Radio value={key}>{ANIMAL_COLORS[key]}</Radio>;
                  } else return <></>;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Descreva o animal",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <TextArea
                rows={6}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Use este espaço para escrever a história do pet, o seu comportamento e particularidades."
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Informações médicas"
              name="medicalInformation"
              labelCol={{ span: 24 }}
            >
              <TextArea
                rows={6}
                onChange={(e) =>
                  handleFormChange("medicalInformation", e.target.value)
                }
                placeholder="Caso necessário, especifique aqui se o pet possui alguma doença ou se necessita de tratamento médico."
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Disponível para adoção imediata?"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Informe a disponibilidade para adoção",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={(e) => handleFormChange("status", e.target.value)}
              >
                <Radio value={"ATIVO"}>Sim</Radio>
                <Radio value={"INATIVO"}>Não</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Fotos" name="files" labelCol={{ span: 24 }}>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  customRequest={customRequest}
                  loading={loading}
                >
                  {fileList.length < 4 && (
                    <div className={styles.addImgContainer}>
                      <span>+</span>
                      <p>Adicionar</p>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <div className={styles.sendFormBtn}>
              <Button
                size="large"
                className={styles.nextBtn}
                type="primary"
                htmlType="submit"
                onClick={() => handleCreateAnimal()}
              >
                Cadastrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
