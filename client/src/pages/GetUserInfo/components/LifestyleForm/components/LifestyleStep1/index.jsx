import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import home from '../../../../../../assets/home.svg';
import MaskedInput from '../../../../../../components/MaskedInput';

export default function LifestyleStep1({ title, description, handler }) {
	const [form] = Form.useForm();
	const [brazilianStates, setBrazilianStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [userAddress, setUserAddress] = useState({
		residenceType: '',
		cep: '',
		number: '',
		street: '',
		city: '',
		state: '',
		complement: '',
	});

	const handleUserAddress = async (value) => {
		const cep = value.cep ? value.cep.replace('-', '') : false;

		if (cep && cep.length === 8) {
			const address = await axios
				.get(`https://viacep.com.br/ws/${cep}/json/`)
				.then((res) => {
					return res.data;
				})
				.catch((err) => {
					return false;
				});

			if (address) {
				form.setFieldsValue({
					cep: value.cep.replace('-', ''),
					street: address.logradouro,
					city: address.localidade,
					state: address.uf,
				});
				handleCities(address.uf);
				setUserAddress((prev) => ({
					...prev,
					cep: value.cep.replace('-', ''),
					street: address.logradouro,
					city: address.localidade,
					state: address.uf,
				}));
				return;
			}
		}

		setUserAddress((prev) => ({
			...prev,
			...value,
		}));
		return;
	};

	const handleCities = async (uf) => {
		const cities = await axios
			.get(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
			)
			.then((res) => res.data)
			.catch((err) => []);

		const citiesName = cities.map((city) => city.nome);
		citiesName.sort();
		setCities(() => citiesName);
	};

	const getStates = async () => {
		const states = await axios
			.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
			.then((res) => res.data)
			.catch((err) => []);

		const statesUf = states.map((state) => state.sigla);
		statesUf.sort();
		setBrazilianStates(() => statesUf);
	};

	useEffect(() => {
		getStates();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.stepHeader}>
				<div className={styles.stepTitle}>
					<img src={home} alt="Endereço" />
					<span>{title}</span>
				</div>
				<span>{description}</span>
			</div>

			<div className={styles.stepInput}>
				<Form className={styles.stepInput} form={form}>
					<Form.Item
						label="Tipo de residência:"
						name="residenceType"
						rules={[
							{
								required: true,
								message: 'Selecione o seu tipo de residência',
							},
						]}
						labelCol={{ span: 24 }}
					>
						<Select
							name={'residenceType'}
							size="large"
							placeholder="Selecione o seu tipo de residência"
						>
							<Select.Option value="apart">Apartamento</Select.Option>
							<Select.Option value="estado1">Casa</Select.Option>
							<Select.Option value="estado2">Chácara</Select.Option>
							<Select.Option value="estado3">Fazenda</Select.Option>
						</Select>
					</Form.Item>
					<div className={styles.inline}>
						<Form.Item
							label="CEP:"
							name="cep"
							rules={[
								{
									message: 'Por favor, insira o CEP no formato 00000-000',
								},
							]}
							labelCol={{ span: 24 }}
						>
							<MaskedInput
								id="cep"
								name="cep"
								mask="99999-999"
								placeholder="_____-___"
								size="large"
								value={userAddress.cep}
								onChange={(e) => handleUserAddress({ cep: e.target.value })}
							/>
						</Form.Item>

						<Form.Item
							label="Logradouro:"
							name="street"
							rules={[
								{
									message: 'Por favor, insira o logradouro.',
								},
							]}
							labelCol={{ span: 24 }}
							initialValue={userAddress.street}
						>
							<Input size="large" placeholder="Digite o logradouro aqui" />
						</Form.Item>
					</div>

					<div className={styles.threeInline}>
						<Form.Item
							label="Número:"
							name="number"
							rules={[
								{
									required: true,
									message: 'Por favor, insira o número da residência.',
								},
							]}
							labelCol={{ span: 24 }}
						>
							<Input size="large" placeholder="Digite o número da residência" />
						</Form.Item>

						<Form.Item
							label="Cidade:"
							name="city"
							rules={[
								{
									required: true,
									message: 'Por favor, selecione a cidade.',
								},
							]}
							labelCol={{ span: 24 }}
						>
							<Select size="large" placeholder="Selecione a cidade">
								{cities.length &&
									cities.map((city) => (
										<Select.Option key={city} value={city}>
											{city}
										</Select.Option>
									))}
							</Select>
						</Form.Item>

						<Form.Item
							label="Estado:"
							name="state"
							rules={[
								{
									required: true,
									message: 'Por favor, selecione o estado.',
								},
							]}
							labelCol={{ span: 24 }}
						>
							<Select
								size="large"
								placeholder="Selecione o estado"
								onChange={(value) => {
									handleUserAddress({ state: value });
									handleCities(value);
								}}
							>
								{brazilianStates.length &&
									brazilianStates.map((state) => (
										<Select.Option key={state} value={state}>
											{state}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</div>
					<Form.Item
						label="Complemento (Opcional):"
						name="complemento"
						labelCol={{ span: 24 }}
					>
						<Input size="large" placeholder="Digite o complemento (opcional)" />
					</Form.Item>
				</Form>
			</div>

			<Button type="primary" onClick={() => handler('step1', userAddress)}>
				Continuar
			</Button>
		</div>
	);
}
