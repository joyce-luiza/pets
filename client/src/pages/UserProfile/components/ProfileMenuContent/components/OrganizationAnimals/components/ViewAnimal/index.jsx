import { Button, Typography, Space, Flex, Carousel } from 'antd';
import styles from './styles.module.css';
import {
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from '../../../../../../../../constants';
import { useState, useEffect } from 'react';
import { axiosRequest } from '../../../../../../../../utils/axiosRequest';
import showMessage from '../../../../../../../../utils/Message';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;

export default function ViewAnimal({ setViewAnimal, animalData, getLifetime }) {
  const [animal, setAnimal] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = (currentSlide) => {};

  const getAnimalData = async () => {
    try {
      setLoading(true);
      const response = await axiosRequest({
        method: 'get',
        path: `/animals/${animalData.id}`,
      });
      setAnimal(response);
      setLoading(false);
    } catch (error) {
      showMessage('error', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', // Define the height for the carousel
    width: '200px',
    background: '#364d79',
  };

  const imageStyle = {
    width: '100%',
    height: '450px',
    objectFit: 'cover', // Ensure the image covers the defined height and width
  };

  useEffect(() => {
    getAnimalData();
  }, [animalData]);

  return (
    <div className={styles.container}>
      {!loading ? (
        animal && (
          <>
            <Flex
              justify="space-between"
              align="center"
              className={styles.header}
            >
              <Button
                className={styles.backBtn}
                size="medium"
                type="link"
                onClick={() => setViewAnimal(false)}
              >
                <i className="ri-arrow-left-line ri-xl"></i>
                <span>Voltar</span>
              </Button>
            </Flex>

            <Flex vertical gap={40}>
              <Title level={2} style={{ textAlign: 'left', marginTop: 40 }}>
                {animal.name}
              </Title>
              <Carousel afterChange={onChange} style={{ width: '40vw' }}>
                {animal.files &&
                  animal.files.map((file, index) => (
                    <div key={index} style={contentStyle}>
                      <img
                        src={file.fileUrl}
                        alt={`animal file ${index}`}
                        style={imageStyle}
                      />
                    </div>
                  ))}
              </Carousel>
              <Space direction="horizontal" size={24}>
                <Flex vertical>
                  <Paragraph strong>Tipo:</Paragraph>
                  <Paragraph>{ANIMAL_TYPES[animal.type]}</Paragraph>
                </Flex>

                <Flex vertical>
                  <Paragraph strong>Idade:</Paragraph>
                  <Paragraph>{getLifetime(animal.birthDate)}</Paragraph>
                </Flex>
                <Flex vertical>
                  <Paragraph strong>Sexo:</Paragraph>
                  <Paragraph>
                    {animal.sex === 'FEMALE' ? 'Fêmea' : 'Macho'}
                  </Paragraph>
                </Flex>

                <Flex vertical>
                  <Paragraph strong>Porte:</Paragraph>
                  <Paragraph>{ANIMAL_SIZES[animal.size]}</Paragraph>
                </Flex>
              </Space>
              <Flex vertical>
                <Title level={4}>Descrição</Title>
                <Paragraph>{animal.description}</Paragraph>
              </Flex>
              <Flex vertical>
                <Title level={4}>Informações médicas</Title>
                <Paragraph>{animal.medicalInformation}</Paragraph>
              </Flex>
            </Flex>
          </>
        )
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
