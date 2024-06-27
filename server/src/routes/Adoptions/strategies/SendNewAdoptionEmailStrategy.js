import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    AnimalRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";
import { sendEmail } from "../../../app/utils";
import formatEmail from "../../../app/utils/emails/formatEmail";

/**
 * Strategy to send email to approved adopter
 *
 * @extends AbstractStrategy
 */
export default class SendNewAdoptionEmailStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository
     * @param {AnimalRepository} animalRepository
     * @param {OrganizationMemberRepository} organizationMemberRepository
     */

    constructor(
        adoptionRepository,
        animalRepository,
        organizationMemberRepository
    ) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {Object} data - Adoption object
     */

    async execute(data, dto) {
        const animal = await this.animalRepository.findById(dto.animalId);

        const organizationMembers =
            await this.organizationMemberRepository.findAllByProp(
                "organizationId",
                animal.organizationId
            );

        // Iterating through each organization member to send the email
        for (const organizationMember of organizationMembers) {
            // Building the body of the email
            const emailHtml = formatEmail({
                subject: `Novo interesse no pet ${animal.name}!`,
                body: `
                    <p> Olá ${organizationMember.firstName}! </p>
                    <p> Um adotante expressou interesse no pet ${animal.name}!</p>
                    <p> Acesse a página de "Adoções" no seu perfil para conferir.</p>
                    <a class="call-to-action" style="color: #fff; " href="${process.env.REDIRECT_URL}/profile">Ver adoções</a>
                `,
            });

            // Defining email parameters
            const mailOptions = {
                from: process.env.FROM_EMAIL,
                to: organizationMember.email,
                subject: `Novo interesse no pet ${animal.name}!`,
                html: emailHtml,
            };

            // Sending email
            sendEmail(mailOptions);
        }
    }
}
