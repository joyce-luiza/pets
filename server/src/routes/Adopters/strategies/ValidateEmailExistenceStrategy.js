import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { AdopterRepository } from "../../../app/repositories";

/**
 * Strategy to validate if adopter's email already exists.
 *
 * @extends AbstractStrategy
 */
export default class ValidateEmailExistenceStrategy extends AbstractStrategy {
    /**
     *
     * @param {AdopterRepository} adopterRepository
     */
    constructor(adopterRepository) {
        super();
        this.adopterRepository = adopterRepository;
    }

    /**
     * Verify email existence on Adopters table
     *
     * @param {Adopter} data - The data object containing email property.
     * @param {string} data.email - The adopter email.
     * @param {Object} loggedUserInfo - The logged-in user's information.
     * @throws {Error} Throws an error if the adopter's email already existence.
     */
    async execute({ email }, dto, loggedUserInfo) {
        const adopter = await this.adopterRepository.findOne({
            where: {
                email,
                statusId: await this.adopterRepository.getActiveStatusId(),
            },
        });

        if (loggedUserInfo) {
            const loggedAdopter = await this.adopterRepository.findById(
                loggedUserInfo.userId
            );

            if (adopter && adopter.id === loggedAdopter.id) return;
        }

        if (adopter) {
            this.throwError("O email informado já está em uso.");
        }
    }
}
