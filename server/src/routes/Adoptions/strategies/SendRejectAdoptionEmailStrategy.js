import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    AdopterRepository,
} from "../../../app/repositories";
import { sendEmail } from "../../../app/utils";
import formatEmail from "../../../app/utils/emails/formatEmail";

/**
 * Strategy to rejects others adoptions
 *
 * @extends AbstractStrategy
 */
export default class SendRejectAdoptionEmailStrategy extends AbstractStrategy {
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
        const { organization, adoption, animal } = dto;

        const adoptions = await this.adoptionRepository.findAllWithProperties({
            animalId: animal.id,
        });

        const filteredAdoptions = adoptions.filter(
            (otherAdoption) => otherAdoption.id !== adoption.id
        );

        filteredAdoptions.forEach(async (adoption) => {
            const adopter = await this.adopterRepository.findById(
                adoption.adopterId
            );

            // Building the body of the email
            const emailHtml = formatEmail({
                subject: `${animal.name} não está mais disponível`,
                body: `
                    <p> Olá ${adopter.firstName}! </p>
                    <p> Infelizmente, o pet ${animal.name} não está mais disponível para adoção.</p>
                    <p> A organização ${organization.name} aprovou a adoção para outro adotante.</p>
                    <p> Mas isso não é motivo para desistir de adotar! Ainda há muitos pets esperando por um
                    lar em nosso site.</p>
                    <a class="call-to-action" style="color: #fff; " href="${process.env.REDIRECT_URL}/animals/">Encontrar pets</a>
                `,
            });

            // Defining email parameters
            const mailOptions = {
                from: process.env.FROM_EMAIL,
                to: adopter.email,
                subject: `${animal.name} não está mais disponível`,
                html: emailHtml,
            };

            // Sending email
            sendEmail(mailOptions);
        });
    }
}
