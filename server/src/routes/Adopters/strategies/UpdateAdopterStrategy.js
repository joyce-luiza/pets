import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterRepository } from "../../../app/repositories";
import { Adopter } from "../../../app/domains";
import sanitize from "../../../app/utils/sanitize";

/**
 * Strategy to update an Adopter
 *
 * @extends AbstractStrategy
 */
export default class UpdateAdopterStrategy extends AbstractStrategy {
    /**
     * @param {AdopterRepository} adopterRepository - An instance of AbstractRepository
     */
    constructor(adopterRepository) {
        super();
        this.adopterRepository = adopterRepository;
    }

    /**
     * @param {Adopter} data - Adopter domain object
     * @param {Object} loggedUserInfo - The logged-in user's information.
     */

    async execute(data, dto, loggedUserInfo) {
        const updated = await this.adopterRepository.update(data, {
            id: loggedUserInfo.userId,
        });

        if (!updated) {
            this.throwError(
                "Erro ao atualizar as informações da conta do adotante"
            );
            return;
        }

        const adopter = await this.adopterRepository.findById(
            loggedUserInfo.userId
        );

        const result = new Adopter(adopter);
        return result;
    }
}
