import AbstractStrategy from "../../../app/abstract/AbstractStrategy";

/**
 * Strategy to deactivate invites
 *
 * @extends AbstractStrategy
 */

export default class DeactivateOrganizationInviteByEmailStrategy extends AbstractStrategy {
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * Inactivate all invitations related to a given email
     *
     * @param {string} email - The email of the organization member.
     * @throws {Error} Throws an error if the invites cannot be deactivated.
     */
    async execute({ invitedEmail }) {
        // Update all invites to set them as inactive
        const updatedInvites = await this.organizationInviteRepository.update(
            {
                statusId:
                    await this.organizationInviteRepository.getInactiveStatusId(),
            },
            {
                invitedEmail: invitedEmail,
            }
        );

        if (!updatedInvites) {
            this.throwError("Erro ao desativar os convites.");
            return;
        }
    }
}
