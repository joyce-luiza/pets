import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterRepository } from "../../../app/repositories";
import { Adopter } from "../../../app/domains";

/**
 * Strategy to create an Adopter
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterStrategy extends AbstractStrategy {
    /**
     * @param {AdopterRepository} adopterRepository - An instance of AbstractRepository
     */
    constructor(adopterRepository) {
        super();
        this.adopterRepository = adopterRepository;
    }

    /**
     * @param {Adopter} data - Adopter domain object
     */
    async execute(data) {
        const adopter = await this.adopterRepository.createAdopter(data);

        if (!adopter) {
            this.throwError("Erro ao criar a conta");
        }

        const result = new Adopter(adopter);

        return result;
    }
}
