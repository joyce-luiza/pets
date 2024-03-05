import React, { useState } from 'react';
import styles from './styles.module.css';
import stepIcon from '../../../../../../assets/smile.svg';
import { Form, Checkbox, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function LifestyleStep1({ title, description, handler, previousStep }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [userPreferences, setUserPreferences] = useState({
        animalTypes: {},
        ageGroup: {},
        sizes: {},
        genders: {},
    });

    const handleStepInfo = async () => {
        try {
            setLoading(true);
            await form.validateFields();
            handler('step2', userPreferences);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const [anySelected, setAnySelected] = useState({
        animalTypes: false,
        ageGroup: false,
        size: false,
        genders: false,
    });

    const animalTypesOptions = [
        { label: 'Cachorro', value: 'dog' },
        { label: 'Gato', value: 'cat' },
        { label: 'Coelho', value: 'rabbit' },
        { label: 'Pássaro', value: 'bird' },
        { label: 'Não tenho preferência', value: 'any' },
    ];

    const ageGroupOptions = [
        { label: 'Filhote (1 a 12 meses)', value: 'young' },
        { label: 'Adulto (1 a 7 anos)', value: 'adult' },
        { label: 'Sênior (7 anos ou mais)', value: 'senior' },
        { label: 'Não tenho preferência', value: 'any' },
    ];

    const sizeOptions = [
        { label: 'Pequeno', value: 'small' },
        { label: 'Médio', value: 'medium' },
        { label: 'Grande', value: 'large' },
        { label: 'Não tenho preferência', value: 'any' },
    ];

    const genderOptions = [
        { label: 'Macho', value: 'male' },
        { label: 'Fêmea', value: 'female' },
    ];

    const colorOptions = [
        { label: 'Preto', value: 'black' },
        { label: 'Branco', value: 'white' },
        { label: 'Marrom', value: 'brown' },
        { label: 'Mesclado', value: 'mixed' },
    ];
    const handleUserPreferences = (value) => {
        setUserPreferences((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleCheckBoxAnswer = (group, selectedOptions) => {
        const result = {};

        for (const selectedOption of selectedOptions) {
            result[selectedOption] = true;
        }

        if (selectedOptions.includes('any')) {
            setAnySelected((prev) => ({ ...prev, [group]: true }));
            handleUserPreferences({ [group]: { any: true } });
            return;
        }

        setAnySelected((prev) => ({ ...prev, [group]: false }));
        handleUserPreferences({ [group]: result });
    };

    return (
        <div className={styles.container}>
            <div className={styles.stepHeader}>
                <div className={styles.stepTitle}>
                    <img src={stepIcon} alt="Endereço" />
                    <span>{title}</span>
                </div>
                <span>{description}</span>
            </div>

            <Form className={styles.stepInput} form={form}>
                <Form.Item
                    label="Qual tipo de animal você está procurando?"
                    name="animalTypes"
                    rules={[
                        {
                            required: true,
                            message: 'Selecione o(s) tipos de seu interesse',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value) => handleCheckBoxAnswer('animalTypes', value)}
                    >
                        <Row>
                            {animalTypesOptions.map((animal) => (
                                <Col span={8} key={animal.value}>
                                    <Checkbox
                                        value={animal.value}
                                        disabled={
                                            !!anySelected.animalTypes && animal.value !== 'any'
                                        }
                                    >
                                        {animal.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    label="Qual faixa etária o pet deve possuir?"
                    name="ageGroups"
                    rules={[
                        {
                            required: true,
                            message: 'Selecione a(s) faixa etária de interesse',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value) => handleCheckBoxAnswer('ageGroup', value)}
                    >
                        <Row>
                            {ageGroupOptions.map((age) => (
                                <Col span={8} key={age.value}>
                                    <Checkbox
                                        value={age.value}
                                        disabled={anySelected.ageGroup && age.value !== 'any'}
                                    >
                                        {age.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    label="Qual o tamanho de pet ideal para você?"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: 'Selecione o(s) tamanho de interesse',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value) => handleCheckBoxAnswer('sizes', value)}
                    >
                        <Row>
                            {sizeOptions.map((size) => (
                                <Col span={8} key={size.value}>
                                    <Checkbox
                                        value={size.value}
                                        disabled={anySelected.sizes && size.value !== 'any'}
                                    >
                                        {size.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    label="De qual sexo o seu pet deve ser?"
                    name="genders"
                    rules={[
                        {
                            required: true,
                            message: 'Selecione o(s) tamanho de interesse',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value) => handleCheckBoxAnswer('genders', value)}
                    >
                        <Row>
                            {genderOptions.map((gender) => (
                                <Col span={8} key={gender.value}>
                                    <Checkbox
                                        value={gender.value}
                                        disabled={anySelected.genders && gender.value !== 'any'}
                                    >
                                        {gender.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    label="Há alguma cor específica que o seu pet deve ter?"
                    name="colors"
                    rules={[
                        {
                            required: true,
                            message: 'Selecione a(s) cores de interesse',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={(value) => handleCheckBoxAnswer('colors', value)}
                    >
                        <Row>
                            {colorOptions.map((color) => (
                                <Col span={8} key={color.value}>
                                    <Checkbox
                                        value={color.value}
                                        disabled={anySelected.colors && color.value !== 'any'}
                                    >
                                        {color.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </Form>

            <div className={styles.formActions}>
                <Button
                    className={styles.nextBtn}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    onClick={handleStepInfo}
                >
                    Continuar
                </Button>
                <Button
                    className={styles.backBtn}
                    type="link"
                    htmlType="submit"
                    icon={<ArrowLeftOutlined />}
                    onClick={previousStep}
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
}
