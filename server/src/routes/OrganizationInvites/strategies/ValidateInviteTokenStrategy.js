import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInvite } from "../../../database/models";

/**
 * Strategy to validate token.
 *
 * @extends AbstractStrategy
 */
export default class ValidateInvitationTokenFactory extends AbstractStrategy {
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }

    /**
     * Verify token validity on OrganizationInvites table
     *
     * @param {String} token - The token property.
     * @throws {Error} Throws an error if the member's email already existence.
     */
    async execute({ token }) {
        const invite = await this.organizationInviteRepository.findOne({
            where: {
                token: token,
                statusId:
                    await this.organizationInviteRepository.getActiveStatusId(),
            },
        });

        if (!invite) {
            this.throwError(`O convite está expirado.`);
        }

        return invite.organizationId;
    }
}
