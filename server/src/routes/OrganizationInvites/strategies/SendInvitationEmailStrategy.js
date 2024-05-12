import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Organization, OrganizationMember } from "../../../app/domains";
import { OrganizationInvite } from "../../../database/models";
import { sendEmail } from "../../../app/utils";

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

        const body = `
            <p> Olá! </p>
            <p> ${organizationAdminName} te convidou para fazer parte da organização ${organizationName}.</p>
            <a href="http://localhost:3000/invited/${encodeURIComponent(
                invite.token
            )}"> Criar conta</a>
            `;

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: invite.invitedEmail,
            subject: `${organizationAdminName} te convidou para a ${organizationName}`,
            html: body,
        };

        sendEmail(mailOptions);

        return invite;
    }
}
