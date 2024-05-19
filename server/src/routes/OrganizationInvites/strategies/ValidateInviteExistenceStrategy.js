import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInvite } from "../../../app/domains";

/**
 * Strategy to check if an Organization Invite exists for a given email
 *
 * @extends AbstractStrategy
 */
export default class ValidateInviteExistenceStrategy extends AbstractStrategy {
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * Check if an organization invite exists for the given email.
     *
     * @param {string} invitedEmail - The email address to check for.
     * @returns {boolean}
     */
    async execute({ invitedEmail }) {
        const existingInvite =
            await this.organizationInviteRepository.findByProp(
                "invitedEmail",
                invitedEmail
            );

        // Implementar método para atualizar o convite encontrado com o status "Inativo"
    }
}
