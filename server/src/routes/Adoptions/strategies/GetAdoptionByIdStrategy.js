import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adoption } from "../../../app/domains";
import { AdoptionResult } from "../../../app/domains/result";

/**
 * Strategy to get adoption by id.
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionByIdStrategy extends AbstractStrategy {
    constructor(adoptionRepository, resultRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.resultRepository = resultRepository;
    }

    /**
     * @param {String} id - The data object containing adoption id.
     */
    async execute({ id }) {
        const adoption = await this.adoptionRepository.findActiveAdoptionById(
            id
        );

        const resultId = adoption.resultId;

        const { title } = await this.resultRepository.findById(resultId);

        const adoptionData = new Adoption(adoption);

        const formattedAdoption = { ...adoptionData, result: title };

        return new AdoptionResult(formattedAdoption);
    }
}
