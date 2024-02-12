import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Login } from '../../../app/domains';
import { USER_TYPE } from '../../../constants';

/**
 * Strategy to validade required Login fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateLoginRequiredFieldsStrategy extends AbstractStrategy {
	constructor() {
		super();
	}

	/**
	 * @param {Login} data - Login domain object
	 * @param dto
	 */
	async execute({ email, password, type, token }) {
		const generateError = () => {
			this.throwError('Campo obrigatório não informado', 400);
		};

		if (!token) {
			if (!email) generateError();
			if (!password) generateError();
		}
		if (!Object.values(USER_TYPE).includes(type.toUpperCase())) generateError();
	}
}
