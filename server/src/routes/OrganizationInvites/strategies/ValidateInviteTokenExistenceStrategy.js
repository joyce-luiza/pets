import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInviteRepository } from "../../../app/repositories";
import { OrganizationInvite } from "../../../app/domains";

/**
 * @extends AbstractStrategy
 */
export default class ValidateInviteTokenExistenceStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationRepository} organizationInviteRepository
     */
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * @param {string} token
     * @throws {Error}
     */

    async execute({ token }) {
        const invite = await this.organizationInviteRepository.countGeneric({
            where: { token },
        });
        if (!invite) {
            this.throwError("Convite inválido.");
        }
    }
}
