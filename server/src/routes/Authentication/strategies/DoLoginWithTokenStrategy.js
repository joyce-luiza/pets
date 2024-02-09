import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import auth from '../../../config/auth';
import jwt from 'jsonwebtoken';
import { AdopterRepository } from '../../../app/repositories/AdopterRepository';
import { Login } from '../../../app/domains';
import { USER_TYPE } from '../../../constants';
import { promisify } from 'util';
/**
 * Strategy to do login by token
 *
 * @extends AbstractStrategy
 */
export default class DoLoginWithTokenStrategy extends AbstractStrategy {
	/**
	 *
	 * @param {AdopterRepository} adopterRepository
	 */
	constructor(adopterRepository) {
		super();
		this.adopterRepository = adopterRepository;
	}

	/**
	 * @param {Login} data - Login domain object
	 */
	async execute({ token, type }) {
		if (!token) return;

		const verifiedToken = await promisify(jwt.verify)(token, auth.secret);

		if (!verifiedToken) {
			this.throwError('O token informado não é válido.', 400);
			return;
		}

		let result = {};

		switch (type) {
			case USER_TYPE.ADOPTER:
				const adopter = await this.adopterRepository.findById(verifiedToken.id);

				if (!adopter) {
					this.throwError(
						'Não foi possível recuperar os dados do adotante.',
						500
					);
				}

				const { id, firstName, email } = adopter;

				result = {
					id,
					firstName,
					email,
					type,
					token: jwt.sign({ id, type: verifiedToken.type }, auth.secret, {
						expiresIn: auth.expiresIn,
					}),
				};
				break;
			case USER_TYPE.ORGANIZATION:
				break;
			default:
				break;
		}

		return result;
	}
}
