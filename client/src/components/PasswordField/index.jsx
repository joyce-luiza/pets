import { Form, Input } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { STATE_COLORS } from '../../constants';

const defaultPasswordCriteria = [
	{
		label: 'Pelo menos 10 caracteres',
		regex: /^.{10,}$/,
		isValid: false,
	},
	{
		label: 'Pelo menos uma letra maiúscula',
		regex: /[A-Z]/,
		isValid: false,
	},
	{
		label: 'Pelo menos um símbolo especial',
		regex: /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
		isValid: false,
	},
	{
		label: 'Pelo menos um número',
		regex: /[0-9]/,
		isValid: false,
	},
];

const PasswordField = ({
	name,
	label,
	placeholder,
	validate = true,
	...props
}) => {
	const [password, setPassword] = useState('');

	const updateCriteriaValidity = (value) => {
		if (validate) {
			defaultPasswordCriteria.forEach((criteria) => {
				criteria.isValid = criteria.regex.test(value);
			});
		}
	};

	const validatePasswordField = (_, value) => {
		if (!value) {
			return Promise.resolve();
		}
		updateCriteriaValidity(value);
		const isValid = defaultPasswordCriteria.every((criteria) =>
			criteria.regex.test(value)
		);
		if (!isValid) {
			return Promise.reject('A senha não atende aos critérios necessários.');
		}
		return Promise.resolve();
	};

	return (
		<div>
			<Form.Item
				style={{ marginBottom: '8px' }}
				label={`${label ? label : 'Senha'}:`}
				name={name}
				validateTrigger="onBlur"
				rules={[
					{
						required: true,
						message: 'Insira uma senha',
					},
					{
						validator: validate ? validatePasswordField : null,
					},
				]}
			>
				<Input.Password
					size="large"
					placeholder={placeholder ? placeholder : 'Senha'}
					value={password}
					onChange={(e) => {
						updateCriteriaValidity(e.target.value);
						setPassword(e.target.value);
					}}
					{...props}
				/>
			</Form.Item>
			{validate && (
				<div style={{ marginBottom: '40px' }}>
					{defaultPasswordCriteria.map((criteria) => (
						<div
							key={criteria.label}
							style={{
								color: criteria.isValid
									? STATE_COLORS.SUCCESS
									: STATE_COLORS.DEFAULT,
								display: 'flex',
								gap: '8px',
							}}
						>
							{criteria.isValid ? (
								<i className="ri-checkbox-circle-line"></i>
							) : (
								<i className="ri-checkbox-blank-circle-line"></i>
							)}
							{criteria.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

PasswordField.propTypes = {
	name: PropTypes.string,
};

export default PasswordField;
