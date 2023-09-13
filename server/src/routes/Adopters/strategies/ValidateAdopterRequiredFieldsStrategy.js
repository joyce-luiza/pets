import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Adopter } from '../../../app/domains';

/**
 * Strategy to validade required Adopter fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAdopterRequiredFieldsStrategy extends AbstractStrategy {
	constructor() {
		super();
	}

	/**
	 * @param {Adopter} data - Adopter domain object
	 */
	async execute(data) {
		const generateError = () => {
			this.throwError('Campo obrigatório não informado', 400);
		};

		if (!data.firstName) {
			generateError();
		}
		if (!data.lastName) {
			generateError();
		}
		if (!data.birthDate) {
			generateError();
		}
		if (!data.email) {
			generateError();
		}
		if (!data.password) {
			generateError();
		}
		if (!data.phoneNumber) {
			generateError();
		}
	}
}
