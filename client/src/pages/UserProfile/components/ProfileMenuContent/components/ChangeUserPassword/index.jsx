import { Button, Form } from 'antd';
import styles from './styles.module.css';
import PasswordField from '../../../../../../components/PasswordField';
import { useState } from 'react';
import showMessage from '../../../../../../utils/Message';
import { USER_TYPE } from '../../../../../../constants';
import { axiosRequest } from '../../../../../../utils/axiosRequest';

export default function ChangeUserPassword({ user }) {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async ({
		currentPassword,
		newPassword,
		passwordConfirmation,
	}) => {
		setLoading(true);
		if (newPassword !== passwordConfirmation) {
			showMessage('error', 'As senhas não condizem');
			return;
		}

		if (!currentPassword) {
			showMessage('error', 'Senha atual não informada');
			return;
		}

		try {
			switch (user.type) {
				case USER_TYPE.ADOPTER: {
					const verifiedCurrentPassword = await axiosRequest({
						method: 'POST',
						path: '/auth/verify/password',
						body: {
							password: currentPassword,
						},
						authenticated: true,
					});

					if (!verifiedCurrentPassword.isValid) {
						showMessage('error', 'Senha atual incorreta.');
						return;
					}

					await axiosRequest({
						method: 'PUT',
						path: '/adopter/password',
						body: {
							currentPassword,
							newPassword,
							passwordConfirmation,
						},
						authenticated: true,
					});

					showMessage('success', 'Senha alterada com sucesso');
					break;
				}
				case USER_TYPE.ORGANIZATION: {
					const verifiedCurrentPassword = await axiosRequest({
						method: 'POST',
						path: '/auth/verify/password',
						body: {
							password: currentPassword,
						},
						authenticated: true,
					});

					if (!verifiedCurrentPassword.isValid) {
						showMessage('error', 'Senha atual incorreta.');
						return;
					}

					await axiosRequest({
						method: 'PUT',
						path: '/member/password',
						body: {
							currentPassword,
							newPassword,
							passwordConfirmation,
						},
						authenticated: true,
					});

					showMessage('success', 'Senha alterada com sucesso');
					break;
				}
				default:
					showMessage('error', 'Tipo de usuário inválido');
					break;
			}
		} catch (error) {
			showMessage('error', error);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Alterar senha</h2>

			<Form
				className={styles.formContainer}
				layout="vertical"
				onFinish={async (e) => {
					await handleSubmit(e);
					setLoading(false);
				}}
			>
				<Form.Item>
					<PasswordField
						label={'Senha atual'}
						placeholder={'Insira sua senha atual'}
						name={'currentPassword'}
						validate={false}
					/>
				</Form.Item>

				<Form.Item>
					<PasswordField
						label={'Nova senha'}
						placeholder={'Insira a sua nova senha'}
						name={'newPassword'}
					/>
				</Form.Item>

				<Form.Item>
					<PasswordField
						label={'Confirme a nova senha'}
						placeholder={'Confirme a nova senha'}
						name={'passwordConfirmation'}
						validate={false}
					/>
				</Form.Item>

				<Button
					block
					size="large"
					type="primary"
					htmlType="submit"
					loading={loading}
				>
					Alterar senha
				</Button>
			</Form>
		</div>
	);
}
