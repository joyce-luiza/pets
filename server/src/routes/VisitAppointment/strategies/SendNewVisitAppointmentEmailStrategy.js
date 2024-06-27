import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AnimalRepository,
    OrganizationMemberRepository,
    AdopterRepository,
} from "../../../app/repositories";
import { sendEmail } from "../../../app/utils";
import formatEmail from "../../../app/utils/emails/formatEmail";

/**
 * Strategy to send email to approver user
 *
 * @extends AbstractStrategy
 */
export default class SendNewVisitAppointmentEmailStrategy extends AbstractStrategy {
    /**
     * @param {AnimalRepository} animalRepository
     * @param {OrganizationMemberRepository} organizationMemberRepository
     * @param {AdopterRepository} adopterRepository
     */

    constructor(
        animalRepository,
        organizationMemberRepository,
        adopterRepository
    ) {
        super();
        this.animalRepository = animalRepository;
        this.organizationMemberRepository = organizationMemberRepository;
        this.adopterRepository = adopterRepository;
    }

    /**
     * @param {Object} data - Visit object
     */

    async execute(data, dto, loggedUserInfo) {
        const { type } = loggedUserInfo;

        if (type === "ADOPTER") {
            const organizationMembers =
                await this.organizationMemberRepository.findAllByProp(
                    "organizationId",
                    dto.organizationId
                );

            for (const member of organizationMembers) {
                const emailHtml = formatEmail({
                    subject: `Novo interesse em visita!`,
                    body: `
                    <p>Olá ${member.firstName}!</p>
                    <p>Um adotante expressou interesse em uma visita!</p>
                    <p>Acesse a página de "Visitas" no seu perfil para conferir.</p>
                    <a class="call-to-action" style="color: #fff; " href="${process.env.REDIRECT_URL}/profile">Ver visitas</a>
                `,
                });

                const mailOptions = {
                    from: process.env.FROM_EMAIL,
                    to: member.email,
                    subject: `Novo interesse em visita!`,
                    html: emailHtml,
                };

                sendEmail(mailOptions);
            }
        } else {
            const adopter = await this.adopterRepository.findById(
                dto.adopterId
            );
            const emailHtml = formatEmail({
                subject: `Novo interesse em visita!`,
                body: `
                    <p>Olá ${adopter.firstName}!</p>
                    <p>Uma organização expressou interesse em marcar uma visita!</p>
                    <p>Acesse a página de "Visitas" no seu perfil para conferir.</p>
                    <a class="call-to-action" style="color: #fff; " href="${process.env.REDIRECT_URL}/profile">Ver visitas</a>
                `,
            });

            const mailOptions = {
                from: process.env.FROM_EMAIL,
                to: adopter.email,
                subject: `Nova solicitação de visita!`,
                html: emailHtml,
            };

            sendEmail(mailOptions);
        }
    }
}
