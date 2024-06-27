import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Space, Carousel } from 'antd';
import styles from './styles.module.css';
import {
  ANIMAL_COLORS,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from '../../../../../../../../constants';
import { axiosRequest } from '../../../../../../../../utils/axiosRequest';
import showMessage from '../../../../../../../../utils/Message';

const { Title, Paragraph } = Typography;

export default function ViewAnimal({ setViewAnimal, animalData, getLifetime }) {
  const [animal, setAnimal] = useState();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();

  const onChange = (currentSlide) => {
    setCurrentIndex(currentSlide);
  };

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

  useEffect(() => {
    getAnimalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalData]);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        animal && (
          <>
            <div className={styles.header}>
              <Button
                className={styles.backBtn}
                size="medium"
                type="link"
                onClick={() => setViewAnimal(false)}
              >
                <i className="ri-arrow-left-line ri-xl"></i>
                <span>Voltar</span>
              </Button>
            </div>

            <div className={styles.content}>
              <Title level={2} style={{ textAlign: 'left', marginTop: 40 }}>
                {animal.name}
              </Title>
              <div className={styles.carouselContainer}>
                {animal.files && animal.files.length > 1 && (
                  <>
                    <div
                      className={`${styles.carouselArrow} ${styles.left}`}
                      onClick={handlePrev}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </div>
                    <div
                      className={`${styles.carouselArrow} ${styles.right}`}
                      onClick={handleNext}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </div>
                  </>
                )}
                <Carousel
                  afterChange={onChange}
                  style={{ width: '40vw' }}
                  ref={carouselRef}
                >
                  {animal.files &&
                    animal.files.map((file, index) => (
                      <div key={index} className={styles.contentStyle}>
                        <img
                          src={file.fileUrl}
                          alt={`animal file ${index}`}
                          className={styles.imageStyle}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
              <Space direction="horizontal" size={24}>
                <div>
                  <Paragraph strong>Tipo:</Paragraph>
                  <Paragraph>{ANIMAL_TYPES[animal.type]}</Paragraph>
                </div>
                <div>
                  <Paragraph strong>Idade:</Paragraph>
                  <Paragraph>{getLifetime(animal.birthDate)}</Paragraph>
                </div>
                <div>
                  <Paragraph strong>Sexo:</Paragraph>
                  <Paragraph>
                    {animal.sex === 'FEMALE' ? 'Fêmea' : 'Macho'}
                  </Paragraph>
                </div>
                <div>
                  <Paragraph strong>Porte:</Paragraph>
                  <Paragraph>{ANIMAL_SIZES[animal.size]}</Paragraph>
                </div>
              </Space>
              <div>
                <Title level={4}>Descrição</Title>
                <Paragraph>{animal.description}</Paragraph>
              </div>
              <div>
                <Title level={4}>Informações médicas</Title>
                <Paragraph>{animal.medicalInformation}</Paragraph>
              </div>
            </div>
          </>
        )
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
