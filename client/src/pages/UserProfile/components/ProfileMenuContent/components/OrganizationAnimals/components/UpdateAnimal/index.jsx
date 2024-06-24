import { Button, DatePicker, Form, Input, Radio, Tooltip, Upload } from 'antd';
import styles from './styles.module.css';
import {
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from '../../../../../../../../constants';
import { useState, useEffect } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ImgCrop from 'antd-img-crop';
import { axiosRequest } from '../../../../../../../../utils/axiosRequest';
import showMessage from '../../../../../../../../utils/Message';
import moment from 'moment';
import dayjs from 'dayjs';

export default function UpdateAnimal({ setUpdateAnimal, animalData }) {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);
  const [animalFiles, setAnimalFiles] = useState([]);

  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
    form.setFieldsValue({ birthDate: formattedDate });
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

  const getAnimalData = async () => {
    try {
      setLoading(true);
      const response = await axiosRequest({
        method: 'get',
        path: `/animals/${animalData.id}`,
      });
      setAnimal(response);
      setAnimalFiles(response.files);
      setLoading(false);
    } catch (error) {
      showMessage('error', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAnimal = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      const data = {
        ...values,
        organizationId: animal.organizationId,
        id: animal.id,
      };

      formData.append('data', JSON.stringify(data)); // Stringify the form values
      fileList.forEach((file) => {
        formData.append('files', file.originFileObj);
      });

      const response = await axiosRequest({
        method: 'PUT',
        authenticated: true,
        body: formData,
        path: '/animals',
        type: 'multipart',
      });

      if (response) {
        setUpdateAnimal(false);
        showMessage('success', 'Animal atualizado com sucesso');
      } else {
        throw new Error(response?.message || 'Erro ao atualizar o animal');
      }
    } catch (error) {
      showMessage('error', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  function createAnimalObjects(files) {
    return files.map((file, index) => ({
      id: file.id,
      name: `Animal ${index + 1}`,
      status: 'active', // Assuming status is always 'active', update this logic if necessary
      url: file.fileUrl,
    }));
  }

  useEffect(() => {
    getAnimalData();
  }, [animalData.id]);

  useEffect(() => {
    if (animal) {
      let { birthDate } = animal;
      const data = {
        ...animal,
        birthDate: dayjs(birthDate),
      };
      form.setFieldsValue(data);

      const files = createAnimalObjects(animalFiles);
      setFileList(files);
    }
  }, [animal, animalFiles, form]);

  return (
    <>
      <Tooltip onClick={() => setUpdateAnimal(false)} title="Retornar à lista">
        <Button className={styles.backBtn} size="medium" type="link">
          <i className="ri-arrow-left-line ri-xl"></i>
          <span>Voltar</span>
        </Button>
      </Tooltip>
      <h2 className={styles.title}>Alterar animal</h2>

      <div className={styles.formContainer}>
        <div className={styles.form}>
          <Form form={form} onFinish={handleUpdateAnimal}>
            <Form.Item
              label="Tipo de animal"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Selecione o tipo do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group>
                {Object.keys(ANIMAL_TYPES).map((key) => {
                  if (key !== 'ANY') {
                    return <Radio value={key}>{ANIMAL_TYPES[key]}</Radio>;
                  } else return null;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Sexo do animal"
              name="sex"
              rules={[
                {
                  required: true,
                  message: 'Selecione o sexo do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group>
                <Radio value={'FEMALE'}>Fêmea</Radio>
                <Radio value={'MALE'}>Macho</Radio>;
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Nome"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Insira o nome do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input size="large" placeholder="Nome completo" />
            </Form.Item>

            <Form.Item
              name="birthDate"
              label="Data de nascimento"
              rules={[
                {
                  required: true,
                  message: 'Insira a data de nascimento do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <DatePicker
                onChange={handleDateChange}
                style={{ width: '100%' }}
                size="large"
                format="DD/MM/YYYY"
                placeholder="XX/XX/XXXX"
              />
            </Form.Item>

            <Form.Item
              label="Porte do animal"
              name="size"
              rules={[
                {
                  required: true,
                  message: 'Selecione o porte do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group>
                {Object.keys(ANIMAL_SIZES).map((key) => {
                  if (key !== 'ANY') {
                    return <Radio value={key}>{ANIMAL_SIZES[key]}</Radio>;
                  } else return null;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Cor do animal"
              name="color"
              rules={[
                {
                  required: true,
                  message: 'Selecione a cor do animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group>
                {Object.keys(ANIMAL_COLORS).map((key) => {
                  if (key !== 'ANY') {
                    return <Radio value={key}>{ANIMAL_COLORS[key]}</Radio>;
                  } else return null;
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Descreva o animal',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <TextArea
                rows={6}
                placeholder="Use este espaço para escrever a história do pet, o seu comportamento e particularidades."
                style={{
                  height: 150,
                  resize: 'none',
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
                placeholder="Caso necessário, especifique aqui se o pet possui alguma doença ou se necessita de tratamento médico."
                style={{
                  height: 150,
                  resize: 'none',
                }}
              />
            </Form.Item>

            <Form.Item
              label="Disponível para adoção imediata?"
              name="status"
              rules={[
                {
                  required: true,
                  message: 'Informe a disponibilidade para adoção',
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Radio.Group>
                <Radio value={'ATIVO'}>Sim</Radio>
                <Radio value={'INATIVO'}>Não</Radio>
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
              >
                Atualizar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
