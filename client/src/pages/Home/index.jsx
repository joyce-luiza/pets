import { React, useRef, useState } from "react";
import { Button, Form, Input, Select, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PetCard from "../../components/PetCard";
import styles from "./styles.module.css";
import testimonialImage1 from "./images/testimonial1.png";
import ctaImage from "./images/cta.png";
import Footer from "../../layout/Footer";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const petsRef = useRef();
    const testimonialsRef = useRef();

    const contentStyle = {
        margin: 0,
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };
    return (
        <>
            <section className={styles.searchPet}>
                <h1>Encontre seu novo melhor amigo</h1>
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
                                            value: "",
                                            label: <span>Cachorro</span>,
                                        },
                                        {
                                            value: "",
                                            label: <span>Gato</span>,
                                        },
                                        {
                                            value: "",
                                            label: <span>Coelho</span>,
                                        },
                                        {
                                            value: "",
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
                                            value: "",
                                            label: (
                                                <span>
                                                    Filhote (1 a 12 meses)
                                                </span>
                                            ),
                                        },
                                        {
                                            value: "",
                                            label: (
                                                <span>Adulto (1 a 7 anos)</span>
                                            ),
                                        },
                                        {
                                            value: "",
                                            label: (
                                                <span>
                                                    Sênior (7 anos ou mais)
                                                </span>
                                            ),
                                        },
                                        {
                                            value: "",
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
                                    size="large"
                                    placeholder="Selecione a localização"
                                    options={[
                                        {
                                            value: "",
                                            label: (
                                                <span>
                                                    Mogi das Cruzes - SP
                                                </span>
                                            ),
                                        },
                                        {
                                            value: "",
                                            label: <span>Suzano - SP</span>,
                                        },
                                        {
                                            value: "",
                                            label: <span>Poá - SP</span>,
                                        },
                                    ]}
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
                    <h2 className="headline2">
                        Pets que podem combinar com você
                    </h2>
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
                    <h2 className="headline2">
                        Histórias de quem encontrou um amigo
                    </h2>
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
                            <h3 className="label">Maiara, tutora do Teodoro</h3>
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
                            <h3 className="label">Maiara, tutora do Teodoro</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section id={styles.process}>
                <div className="sectionTitle">
                    <span>Processo</span>
                    <h2 className="headline2">Como adotar um pet</h2>
                </div>
                <div className={styles.adoptionProcess}>
                    <div className={styles.adoptionStep}>
                        <i class="ri-pass-valid-line ri-2x"></i>
                        <h3 className="label">Cadastro e pesquisa</h3>
                        <p>
                            Os adotantes criam uma conta na plataforma e usam a
                            função de pesquisa para encontrar animais
                            disponíveis.
                        </p>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-calendar-check-line ri-2x"></i>{" "}
                        <h3 className="label">Agendamento e Visita</h3>
                        <p>
                            Depois de encontrar um animal que desejam adotar, os
                            adotantes podem entrar em contato com a organização
                            por meio da plataforma para agendar uma visita ao
                            animal.
                        </p>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-calendar-check-line ri-2x"></i>{" "}
                        <h3 className="label">Processo de Adoção</h3>
                        <p>
                            Se os adotantes decidem adotar, a organização guia o
                            processo, podendo pedir mais informações a respeito
                            do adotante, além de avaliar se a adoção é viável.
                        </p>
                    </div>
                    <div className={styles.adoptionStep}>
                        <i class="ri-home-heart-line ri-2x"></i>{" "}
                        <h3 className="label">Acolhimento do Pet</h3>
                        <p>
                            Após a conclusão bem-sucedida do processo de adoção,
                            o animal é oficialmente adotado e registrado na
                            plataforma.
                        </p>
                    </div>
                </div>
            </section>
            <section id={styles.callToAction}>
                <div>
                    <div id={styles.callToActionTitle} className="sectionTitle">
                        <span>Adote</span>
                        <h2 className="headline2">
                            Encontre o seu melhor amigo
                        </h2>
                    </div>
                    <p>
                        Sua nova melhor amizade está apenas a um clique de
                        distância. Comece a busca agora e deixe seu coração se
                        derreter diante das opções incríveis de adoção que temos
                        para você!
                    </p>
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
