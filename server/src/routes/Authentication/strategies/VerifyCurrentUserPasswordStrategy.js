import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { USER_TYPE } from '../../../constants';
import {
	AdopterRepository,
	OrganizationMemberRepository,
} from '../../../app/repositories';

/**
 * Strategy to current logged user password
 *
 * @extends AbstractStrategy
 */
export default class VerifyCurrentUserPasswordStrategy extends AbstractStrategy {
	/**
	 *
	 * @param {AdopterRepository} adopterRepository
	 * @param {OrganizationMemberRepository} organizationMemberRepository
	 */
	constructor(adopterRepository, organizationMemberRepository) {
		super();
		this.organizationMemberRepository = organizationMemberRepository;
		this.adopterRepository = adopterRepository;
	}

	/**
	 * @param {} data - Login domain object
	 * @param dto
	 * @param loggedUserInfo - Logged user info object
	 */
	async execute(data, dto, loggedUserInfo) {
		switch (loggedUserInfo.type) {
			case USER_TYPE.ADOPTER: {
				const adopter = await this.adopterRepository.findById(
					loggedUserInfo.id
				);

				if (!adopter)
					this.throwError(
						'Não foi possível recuperar os dados do usuário',
						400
					);

				const isValidAdopterPassword = await adopter.checkPassword(
					data.password
				);
				return isValidAdopterPassword;
			}

			case USER_TYPE.ORGANIZATION: {
				const organizationMember =
					await this.organizationMemberRepository.findById(loggedUserInfo.id);

				if (!organizationMember)
					this.throwError(
						'Não foi possível recuperar os dados do usuário',
						400
					);

				const isValidMemberPassword = await organizationMember.checkPassword(
					data.password
				);
				return isValidMemberPassword;
			}
			default:
				this.throwError('Tipo de usuário inválido.', 400);
				break;
		}

		this.throwError('Não foi possível confirmar a senha do usuário', 500);
	}
}
