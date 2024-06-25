import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    ResultRepository,
} from "../../../app/repositories";

/**
 * Strategy to rejects others adoptions
 *
 * @extends AbstractStrategy
 */
export default class RejectOtherAdoptionsStrategy extends AbstractStrategy {
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

    async execute(data, dto) {
        const { adoption } = dto;

        if (
            adoption.resultId ===
            (await this.adoptionRepository.getApprovedResultId())
        ) {
            const adoptions =
                await this.adoptionRepository.findAllWithProperties({
                    animalId: adoption.animalId,
                });

            const filteredAdoptions = adoptions.filter(
                (otherAdoption) => otherAdoption.id !== adoption.id
            );

            for (const otherAdoption of filteredAdoptions) {
                await this.adoptionRepository.update(
                    {
                        resultId:
                            await this.adoptionRepository.getRejectedResultId(),
                        organizationReply:
                            "A adoção foi reprovada automaticamente, pois o animal foi adotado por outra pessoa.",
                    },
                    {
                        id: otherAdoption.id,
                    }
                );
            }
        }
    }
}
