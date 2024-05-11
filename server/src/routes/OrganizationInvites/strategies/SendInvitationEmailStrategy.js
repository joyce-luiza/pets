import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Organization, OrganizationMember } from "../../../app/domains";
import { OrganizationInvite } from "../../../database/models";
import sendInvite from "../../../emails";

/**
 * Strategy to send invitation email.
 *
 * @extends AbstractStrategy
 */
export default class SendInvitationEmailStrategy extends AbstractStrategy {
    constructor(organizationRepository, organizationMemberRepository) {
        super();
        this.organizationRepository = organizationRepository;
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     *
     * @param {OrganizationInvite} invite
     * @throws {Error} Throws an error if the member's email already existence.
     */

    async execute(invite) {
        const { organizationId, organizationAdminId } = invite;

        const organization = await this.organizationRepository.findById(
            organizationId
        );

        const organizationAdmin =
            await this.organizationMemberRepository.findById(
                organizationAdminId
            );

        const organizationName = new Organization(organization).name;

        const organizationAdminName = new OrganizationMember(organizationAdmin)
            .firstName;

        sendInvite(
            invite.invitedEmail,
            organizationAdminName,
            organizationName,
            invite.token
        );
    }
}
