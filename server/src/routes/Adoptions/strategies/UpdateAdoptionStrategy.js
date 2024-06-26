import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    ResultRepository,
} from "../../../app/repositories";
import { Adoption } from "../../../app/domains";

/**
 * Strategy to update an Adoption
 *
 * @extends AbstractStrategy
 */
export default class UpdateAdoptionStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository
     * @param {ResultRepository} resultRepository
     */
    constructor(adoptionRepository, resultRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.resultRepository = resultRepository;
    }

    /**
     * @param {Object} data - Adoption object
     */

    async execute(data) {
        const resultData = await this.resultRepository.findByProp(
            "title",
            data.result
        );

        const updatedAdoption = {
            ...data,
            resultId: resultData.id,
        };

        const updated = await this.adoptionRepository.update(updatedAdoption, {
            id: data.id,
        });

        if (!updated) {
            this.throwError("Erro ao atualizar as informações da adoção.");
            return;
        }

        const adoption = await this.adoptionRepository.findById(data.id);

        const result = new Adoption(adoption);
        return result;
    }
}
