import React, { useState } from 'react';

import BaseForm from '../../components/BaseForm';
import BaseInput from '../../components/BaseInput';
import styles from './styles.module.css';

import calendar from '../../assets/calendar.svg';
import activeEye from '../../assets/activeEye.svg';

export default function CreateAccount() {
	const [passwordInput, setPasswordInput] = useState('password');
	const [passwordInputIcon, setPasswordInputIcon] = useState(activeEye);

	const [datePicker, setDatePicker] = useState(false);

	const togglePasswordInput = () => {
		setPasswordInput((prev) => (prev === 'password' ? 'text' : 'password'));
		// setPasswordInputIcon((prev) => (prev === activeEye ? inactiveEye : activeEye)); // importar inactiveEye e remover comentário desta linha
	};

	return (
		<div className={styles.container}>
			<section className={styles.createAccount}>
				<h2 className={styles.title}>Criar conta</h2>
				<BaseForm>
					<BaseInput label={'Nome completo'} />
					<BaseInput label={'E-mail'} />
					<BaseInput
						type={'date'}
						label={'Data de nascimento'}
						icon={calendar}
					/>
					<BaseInput label={'Número de celular'} />
					<BaseInput
						type={passwordInput}
						label={'Senha'}
						icon={passwordInputIcon}
						onIconClick={togglePasswordInput}
					/>
					<button>Submit</button>
				</BaseForm>
			</section>
			<section className={styles.banner}></section>
		</div>
	);
}
