import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    AdoptionRepository,
    ResultRepository,
    AnimalRepository,
} from "../../../app/repositories";
/**
 * Strategy to verify if animal was adopted
 * @extends AbstractStrategy
 */

export default class VerifyAdoptionAnimalStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository
     * @param {ResultRepository} resultRepository
     * @param {AnimalRepository} animalRepository
     */
    constructor(adoptionRepository, resultRepository, animalRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.resultRepository = resultRepository;
        this.animalRepository = animalRepository;
    }

    /**
     * @param {Object} dto - Adoption object
     */

    async execute(data, dto) {
        const result = await this.resultRepository.findByProp(
            "id",
            dto.resultId
        );

        if (result.title === "APPROVED") {
            const animal = await this.animalRepository.findById(dto.animalId);

            await this.animalRepository.update(
                {
                    statusId:
                        await this.animalRepository.getSuspendedStatusId(),
                },
                { id: animal.id }
            );
        }

        return;
    }
}
