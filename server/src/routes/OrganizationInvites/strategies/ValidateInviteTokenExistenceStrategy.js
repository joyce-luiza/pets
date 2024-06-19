import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInviteRepository } from "../../../app/repositories";

/**
 * Strategy to validate token existence
 *
 * @extends AbstractStrategy
 */
export default class ValidateInviteTokenExistenceStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationInviteRepository} organizationInviteRepository
     */
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * Checks if the token exists in the OrganizationInvites table
     *
     * @param {string} token - The token property.
     * @throws {Error} Throws an error if the member's email already existence.
     */

    async execute({ token }) {
        // Retrives invite by token
        const invite = await this.organizationInviteRepository.findOne({
            where: { token },
        });
        if (!invite) {
            this.throwError("Convite inválido.");
        }
    }
}
