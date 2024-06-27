import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    AdopterRepository,
} from "../../../app/repositories";
import { sendEmail } from "../../../app/utils";
import formatEmail from "../../../app/utils/emails/formatEmail";

/**
 * Strategy to send email to approved adopter
 *
 * @extends AbstractStrategy
 */
export default class SendApprovedAdoptionEmailStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository
     * @param {AdopterRepository} adopterRepository
     */

    constructor(adoptionRepository, adopterRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.adopterRepository = adopterRepository;
    }

    /**
     * @param {Object} data - Adoption object
     */

    async execute(data, dto) {
        const { animal, adopter, organization, adoption } = dto;

        // Building the body of the email
        const emailHtml = formatEmail({
            subject: `Adoção do pet ${animal.name} aprovada!`,
            body: `
                    <p> Olá ${adopter.firstName}! </p>
                    <p> A organização ${organization.name} aprovou a adoção do pet ${animal.name}!</p>
                    <p> Avaliação da organização: </p>
                    <p> ${adoption.organizationReply}</p>
                    <p> Você pode entrar em contato com a organização para obter mais informações ou acessar a área de "Adoções" no seu perfil.</p>
                    <a class="call-to-action" style="color: #fff; " href="${process.env.REDIRECT_URL}/profile">Ver adoções</a>
                `,
        });

        // Defining email parameters
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: adopter.email,
            subject: `Adoção do pet ${animal.name} aprovada!`,
            html: emailHtml,
        };

        // Sending email
        sendEmail(mailOptions);
    }
}
