import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdoptionRepository } from "../../../app/repositories";
import { Adoption } from "../../../app/domains";

/**
 * Strategy to create an Adoption
 *
 * @extends AbstractStrategy
 */
export default class CreateAdoptionStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository - An instance of AbstractRepository
     */
    constructor(adoptionRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
    }

    /**
     * @param {Adoption} data - Adoption domain object
     */
    async execute(data) {
        const adoption = await this.adoptionRepository.createAdoption(data);

        if (!adoption) {
            this.throwError("Erro ao cadastrar adoção.");
        }

        const result = new Adoption(adoption);

        return result;
    }
}
