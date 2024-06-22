import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { USER_TYPE } from '../../../constants';

/**
 * Strategy to validade required fields to compare with logged user password
 *
 * @extends AbstractStrategy
 */
export default class ValidateRequiredFieldsToCompareCurrentUserPasswordStrategy extends AbstractStrategy {
	constructor() {
		super();
	}

	/**
	 * @param {} data
	 * @param dto
	 */
	async execute({ password }, {}, loggedUserInfo) {
		const generateError = () => {
			this.throwError(`Campo obrigatório não informado`, 400);
		};

		if (!password) generateError();
		if (!loggedUserInfo.userId) generateError();
		if (
			!loggedUserInfo.type ||
			!Object.values(USER_TYPE).includes(loggedUserInfo.type)
		)
			generateError();
	}
}
