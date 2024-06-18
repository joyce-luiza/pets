import { React, useState, useEffect } from "react";
import { Button, Form, Select, Typography } from "antd";
import { axiosRequest } from "../../utils/axiosRequest";
import PetCard from "../../components/PetCard";
import styles from "./styles.module.css";
import testimonialImage1 from "./images/testimonial1.png";
import ctaImage from "./images/cta.png";
import Footer from "../../layout/Footer";
import {
  ANIMAL_AGE_GROUPS,
  ANIMAL_TYPES,
  BRAZILIAN_STATES,
} from "../../constants";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  const [loading, setLoading] = useState(false);

  const states = Object.keys(BRAZILIAN_STATES).map((key, index) => ({
    id: index,
    value: key,
    label: BRAZILIAN_STATES[key],
  }));

  const [filter, setFilter] = useState({});
  const navigate = useNavigate();

  const searchAnimals = () => {
    const queryParams = Object.keys(filter).length
      ? `?${Object.keys(filter)
          .map((key) => `${key}=${filter[key]}`)
          .join("&")}`
      : "";

    navigate(`/animals/${queryParams}`);
  };

  return (
    <>
      <section className={styles.searchPet}>
        <Title level={1} style={{ margin: 0 }}>
          Encontre seu novo melhor amigo
        </Title>
        <p>
          Sua nova melhor amizade está apenas a um clique de distância. [Nome do
          site] está cheio de animais adoráveis esperando por um lar amoroso.
        </p>
        <div>
          <Form className={styles.searchBox} layout="vertical">
            <>
              <Form.Item
                name="type"
                label="Tipo de pet:"
                validateTrigger="onBlur"
              >
                <Select
                  size="large"
                  placeholder="Selecione o tipo de pet"
                  options={Object.keys(ANIMAL_TYPES).map((key) => ({
                    value: key,
                    label: <span>{ANIMAL_TYPES[key]}</span>,
                  }))}
                  onSelect={(types) =>
                    setFilter((prev) => ({ ...prev, types }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="age"
                label="Faixa etária:"
                validateTrigger="onBlur"
              >
                <Select
                  size="large"
                  placeholder="Selecione a faixa etária do pet"
                  options={Object.keys(ANIMAL_AGE_GROUPS).map((key) => ({
                    value: key,
                    label: <span>{ANIMAL_AGE_GROUPS[key]}</span>,
                  }))}
                  onSelect={(ageGroups) =>
                    setFilter((prev) => ({ ...prev, ageGroups }))
                  }
                />
              </Form.Item>
              <Form.Item
                name="location"
                label="Localização:"
                validateTrigger="onBlur"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Selecione a localização"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={states}
                  onSelect={(states) =>
                    setFilter((prev) => ({ ...prev, states }))
                  }
                />
              </Form.Item>
            </>
            <Button block size="large" type="primary" onClick={searchAnimals}>
              Procurar
            </Button>
          </Form>
        </div>
      </section>

      <section id={styles.recomendations}>
        <div className="sectionTitle">
          <span>Recomendações</span>
          <Title level={2}>Pets que podem combinar com você</Title>
        </div>
        <div className={styles.carouselPets}>
          <div className={styles.slidePet}>
            <PetCard />
            <PetCard />
            <PetCard />
            <PetCard />
          </div>
          <Button type="primary" size="large">
            Ver mais pets
          </Button>
        </div>
      </section>

      <section id={styles.testimonials}>
        <div className="sectionTitle">
          <span>Depoimentos</span>
          <Title level={2}>Histórias de quem encontrou um amigo</Title>
        </div>
        <div className={styles.testimonials}>
          <div className={styles.testimonial}>
            <div>
              <i className="ri-double-quotes-l ri-2x"></i>
              <p>
                Adotar meu fiel companheiro pela plataforma de adoção de animais
                foi uma das melhores decisões que já tomei. O processo foi
                simples e transparente, e a equipe de suporte foi incrível em
                responder a todas as minhas perguntas. Meu adorável cãozinho,
                Teodoro, trouxe tanta alegria para minha vida. Ele é leal,
                brincalhão e traz um sorriso ao meu rosto todos os dias.
              </p>
              <Title level={5}>Maiara, tutora do Teodoro</Title>
            </div>
            <div
              className={styles.testimonialImg}
              style={{
                height: "40vh",
                backgroundImage: `url(${testimonialImage1})`,
              }}
            ></div>
          </div>
          <div className={styles.testimonial}>
            <div
              className={styles.testimonialImg}
              style={{
                height: "40vh",
                backgroundImage: `url(${testimonialImage1})`,
              }}
            ></div>
            <div>
              <i className="ri-double-quotes-l ri-2x"></i>
              <p>
                Adotar meu fiel companheiro pela plataforma de adoção de animais
                foi uma das melhores decisões que já tomei. O processo foi
                simples e transparente, e a equipe de suporte foi incrível em
                responder a todas as minhas perguntas. Meu adorável cãozinho,
                Teodoro, trouxe tanta alegria para minha vida. Ele é leal,
                brincalhão e traz um sorriso ao meu rosto todos os dias.
              </p>
              <Title level={5}>Maiara, tutora do Teodoro</Title>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.process}>
        <div className="sectionTitle">
          <span>Processo</span>
          <Title level={2}>Como adotar um pet</Title>
        </div>
        <div className={styles.adoptionProcess}>
          <div className={styles.adoptionStep}>
            <i className="ri-pass-valid-line ri-2x"></i>
            <Title level={4}>Cadastro e pesquisa</Title>
            <Paragraph>
              Os adotantes criam uma conta na plataforma e usam a função de
              pesquisa para encontrar animais disponíveis.
            </Paragraph>
          </div>
          <div className={styles.adoptionStep}>
            <i className="ri-calendar-check-line ri-2x"></i>
            <Title level={4}>Agendamento e Visita</Title>
            <Paragraph>
              Depois de encontrar um animal que desejam adotar, os adotantes
              podem entrar em contato com a organização por meio da plataforma
              para agendar uma visita ao animal.
            </Paragraph>
          </div>
          <div className={styles.adoptionStep}>
            <i className="ri-calendar-check-line ri-2x"></i>
            <Title level={4}>Processo de Adoção</Title>
            <Paragraph>
              Se os adotantes decidem adotar, a organização guia o processo,
              podendo pedir mais informações a respeito do adotante, além de
              avaliar se a adoção é viável.
            </Paragraph>
          </div>
          <div className={styles.adoptionStep}>
            <i className="ri-home-heart-line ri-2x"></i>
            <Title level={4}>Acolhimento do Pet</Title>
            <Paragraph>
              Após a conclusão bem-sucedida do processo de adoção, o animal é
              oficialmente adotado e registrado na plataforma.
            </Paragraph>
          </div>
        </div>
      </section>

      <section id={styles.callToAction}>
        <div>
          <div id={styles.callToActionTitle} className="sectionTitle">
            <span>Adote</span>
            <Title level={2} style={{ margin: 0 }}>
              Encontre o seu melhor amigo
            </Title>
          </div>
          <Paragraph>
            Sua nova melhor amizade está apenas a um clique de distância. Comece
            a busca agora e deixe seu coração se derreter diante das opções
            incríveis de adoção que temos para você!
          </Paragraph>
          <Button type="primary" size="large">
            Ver pets disponíveis
          </Button>
        </div>
        <div
          className={styles.ctaImg}
          style={{
            height: "600px",
            backgroundImage: `url(${ctaImage})`,
          }}
        ></div>
      </section>
      <Footer />
    </>
  );
}
