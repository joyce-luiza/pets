import AbstractStrategy from "../../../app/abstract/AbstractStrategy";

/**
 * Strategy that checks if emails match.
 *
 * @extends AbstractStrategy
 */
export default class VerifyOrganizationInviteEmailStrategy extends AbstractStrategy {
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * Checks if the email provided by the user is the same as the one in the OrganizationInvites table
     *
     * @param {String} email - The email provided by the user.
     * @param {String} inviteToken - The token associated with the invite.
     * @throws {Error} Throws an error if the email does not match the invite.
     */
    async execute(invitedEmail, inviteToken) {
        // Retrieve the invite using the token
        const invite = await this.organizationInviteRepository.findOne({
            where: { token: inviteToken },
        });

        if (!invite) {
            this.throwError("Convite não encontrado.");
        }

        // Check if the email provided matches the email in the invite
        if (invite.invitedEmail !== invitedEmail) {
            this.throwError(
                "O email fornecido não corresponde ao email do convite."
            );
        }

        return;
    }
}
