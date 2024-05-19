import { React, useState, useEffect } from "react";
import { Button, Form, Select, Typography } from "antd";
import { axiosRequest } from "../../utils/axiosRequest";
import PetCard from "../../components/PetCard";
import styles from "./styles.module.css";
import testimonialImage1 from "./images/testimonial1.png";
import ctaImage from "./images/cta.png";
import Footer from "../../layout/Footer";

const { Title, Paragraph } = Typography;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState(false);

    useEffect(() => {
        const getCities = async () => {
            setLoading(true);
            const result = await axiosRequest({
                basePath: false,
                path: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios`,
            });
            setCities(
                result.map((city) => {
                    return {
                        id: city.id,
                        value: city.nome,
                        label: `${city.nome} - SP`,
                    };
                })
            );
            setLoading(false);
            console.log(cities);
        };
        getCities();
    }, []);

    return (
        <>
            <section className={styles.searchPet}>
                <Title level={1} style={{ margin: 0 }}>
                    Encontre seu novo melhor amigo
                </Title>
                <p>
                    Sua nova melhor amizade está apenas a um clique de
                    distância. [Nome do site] está cheio de animais adoráveis
                    esperando por um lar amoroso.
                </p>
                <div>
                    <Form
                        className={styles.searchBox}
                        layout="vertical"
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                    >
                        <>
                            <Form.Item
                                name="type"
                                label="Tipo de pet:"
                                validateTrigger="onBlur"
                            >
                                <Select
                                    size="large"
                                    placeholder="Selecione o tipo de pet"
                                    options={[
                                        {
                                            value: "Cachorro",
                                            label: <span>Cachorro</span>,
                                        },
                                        {
                                            value: "Gato",
                                            label: <span>Gato</span>,
                                        },
                                        {
                                            value: "Coelho",
                                            label: <span>Coelho</span>,
                                        },
                                        {
                                            value: "Pássaro",
                                            label: <span>Pássaro</span>,
                                        },
                                    ]}
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
                                    options={[
                                        {
                                            value: "Filhote (1 a 12 meses)",
                                            label: (
                                                <span>
                                                    Filhote (1 a 12 meses)
                                                </span>
                                            ),
                                        },
                                        {
                                            value: "Adulto (1 a 7 anos)",
                                            label: (
                                                <span>Adulto (1 a 7 anos)</span>
                                            ),
                                        },
                                        {
                                            value: "Sênior (7 anos ou mais)",
                                            label: (
                                                <span>
                                                    Sênior (7 anos ou mais)
                                                </span>
                                            ),
                                        },
                                        {
                                            value: "Não tenho preferência",
                                            label: (
                                                <span>
                                                    Não tenho preferência
                                                </span>
                                            ),
                                        },
                                    ]}
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
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ""
                                                ).toLowerCase()
                                            )
                                    }
                                    options={cities}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    size="large"
                                    type="primary"
                                    loading={loading}
                                    htmlType="submit"
                                >
                                    Procurar
                                </Button>
                            </Form.Item>
                        </>
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
                    <Title level={2}>
                        Histórias de quem encontrou um amigo
                    </Title>
                </div>
                <div className={styles.testimonials}>
                    <div className={styles.testimonial}>
                        <div>
                            <i class="ri-double-quotes-l ri-2x"></i>
                            <p>
                                Adotar meu fiel companheiro pela plataforma de
                                adoção de animais foi uma das melhores decisões
                                que já tomei. O processo foi simples e
                                transparente, e a equipe de suporte foi incrível
                                em responder a todas as minhas perguntas. Meu
                                adorável cãozinho, Teodoro, trouxe tanta alegria
                                para minha vida. Ele é leal, brincalhão e traz
                                um sorriso ao meu rosto todos os dias.
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
                            <i class="ri-double-quotes-l ri-2x"></i>
                            <p>
                                Adotar meu fiel companheiro pela plataforma de
                                adoção de animais foi uma das melhores decisões
                                que já tomei. O processo foi simples e
                                transparente, e a equipe de suporte foi incrível
                                em responder a todas as minhas perguntas. Meu
                                adorável cãozinho, Teodoro, trouxe tanta alegria
                                para minha vida. Ele é leal, brincalhão e traz
                                um sorriso ao meu rosto todos os dias.
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
                        <i class="ri-pass-valid-line ri-2x"></i>
                        <Title level={4}>Cadastro e pesquisa</Title>
                        <Paragraph>
                            Os adotantes criam uma conta na plataforma e usam a
                            função de pesquisa para encontrar animais
                            disponíveis.
                        </Paragraph>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-calendar-check-line ri-2x"></i>
                        <Title level={4}>Agendamento e Visita</Title>
                        <Paragraph>
                            Depois de encontrar um animal que desejam adotar, os
                            adotantes podem entrar em contato com a organização
                            por meio da plataforma para agendar uma visita ao
                            animal.
                        </Paragraph>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-calendar-check-line ri-2x"></i>
                        <Title level={4}>Processo de Adoção</Title>
                        <Paragraph>
                            Se os adotantes decidem adotar, a organização guia o
                            processo, podendo pedir mais informações a respeito
                            do adotante, além de avaliar se a adoção é viável.
                        </Paragraph>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-home-heart-line ri-2x"></i>
                        <Title level={4}>Acolhimento do Pet</Title>
                        <Paragraph>
                            Após a conclusão bem-sucedida do processo de adoção,
                            o animal é oficialmente adotado e registrado na
                            plataforma.
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
                        Sua nova melhor amizade está apenas a um clique de
                        distância. Comece a busca agora e deixe seu coração se
                        derreter diante das opções incríveis de adoção que temos
                        para você!
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
