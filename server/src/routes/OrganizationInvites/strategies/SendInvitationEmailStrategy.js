import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Organization, OrganizationMember } from "../../../app/domains";
import { OrganizationInvite } from "../../../database/models";
import { sendEmail } from "../../../app/utils";
import formatEmail from "../../../app/utils/emails/formatEmail";

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
     * Send the email containing the invitation to Organization Member Account
     *
     * @param {OrganizationInvite} invite - The member's invite
     * @throws {Error} - Throws an error if the member's email already existence.
     */

    async execute(invite) {
        const { organizationId, organizationAdminId } = invite;

        // Retrieves organization by id
        const organization = await this.organizationRepository.findById(
            organizationId
        );

        // Retrieves the admin member who invited by id
        const organizationAdmin =
            await this.organizationMemberRepository.findById(
                organizationAdminId
            );

        // Stores the name of the organization
        const organizationName = new Organization(organization).name;

        // Stores the name of the admin member
        const organizationAdminName = new OrganizationMember(organizationAdmin)
            .firstName;

        // Building the body of the email
        const emailHtml = formatEmail({
            subject: `${organizationAdminName} te convidou para a ${organizationName}`,
            body: `
                    <p> Olá! </p>
                    <p> ${organizationAdminName} te convidou para fazer parte da organização ${organizationName}.</p>
                    <a class="call-to-action" style="color: #fff; " href="${
                        process.env.REDIRECT_URL
                    }/invited/${encodeURIComponent(
                invite.token
            )}">Criar conta</a>
                `,
        });

        // Defining email parameters
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: invite.invitedEmail,
            subject: `${organizationAdminName} te convidou para a ${organizationName}`,
            html: emailHtml,
        };

        // Sending email
        sendEmail(mailOptions);

        return invite;
    }
}
