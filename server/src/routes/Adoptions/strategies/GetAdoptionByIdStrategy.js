import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adoption, Organization, Adopter } from "../../../app/domains";
import { AnimalAdapter } from "../../../app/domains/adapters";
import { AdoptionResult } from "../../../app/domains/result";

/**
 * Strategy to get adoption by id.
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionByIdStrategy extends AbstractStrategy {
    constructor(
        adoptionRepository,
        animalRepository,
        adopterRepository,
        resultRepository
    ) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
        this.adopterRepository = adopterRepository;
        this.resultRepository = resultRepository;
    }

    /**
     * @param {String} id - The data object containing adoption id.
     */
    async execute({ id }) {
        // Get adoption
        const adoption = await this.adoptionRepository.findActiveAdoptionById(
            id
        );

        // Get adopter
        const adopter = await this.adopterRepository.findActiveAdopterById(
            adoption.adopterId
        );

        // Get animal with files
        const animal = await this.animalRepository.getWithFilesById({
            id: adoption.animalId,
        });

        // Get result title
        const resultId = adoption.resultId;

        const { title } = await this.resultRepository.findById(resultId);

        const adoptionData = new Adoption(adoption);

        return {
            adoption: new AdoptionResult({ ...adoptionData, result: title }),
            adopter: new Adopter(adopter),
            animal: new AnimalAdapter(animal),
        };
    }
}
