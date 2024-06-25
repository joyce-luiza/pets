import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter, Adoption, Animal, Organization } from "../../../app/domains";
import {
    AdoptionRepository,
    ResultRepository,
    AdopterRepository,
    AnimalRepository,
    OrganizationRepository,
} from "../../../app/repositories";

/**
 * Strategy to rejects others adoptions
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionAssociationsStrategy extends AbstractStrategy {
    /**
     * @param {AdoptionRepository} adoptionRepository
     * @param {ResultRepository} resultRepository
     * @param {AdopterRepository} adopterRepository
     * @param {AnimalRepository} animalRepository
     * @param {OrganizationRepository} organizationRepository
     */
    constructor(
        adoptionRepository,
        resultRepository,
        adopterRepository,
        animalRepository,
        organizationRepository
    ) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.resultRepository = resultRepository;
        this.adopterRepository = adopterRepository;
        this.animalRepository = animalRepository;
        this.organizationRepository = organizationRepository;
    }

    /**
     * @param {Object} data - Adoption object
     */

    async execute(data, dto) {
        const adoptionData = await this.adoptionRepository.findById(data.id);

        if (!adoptionData) {
            this.throwError("Não foi possível encontrar a adoção.", 400);
            return;
        }

        const adoption = new Adoption(adoptionData);

        const adopterData = await this.adopterRepository.findById(
            adoption.adopterId
        );

        if (!adopterData) {
            this.throwError("Não foi possível encontrar o adotante.", 400);
            return;
        }

        const adopter = new Adopter(adopterData);

        const animalData = await this.animalRepository.findById(
            adoption.animalId
        );

        if (!animalData) {
            this.throwError("Não foi possível encontrar o animal.", 400);
            return;
        }

        const animal = new Animal(animalData);

        const organizationData = await this.organizationRepository.findById(
            animal.organizationId
        );

        if (!organizationData) {
            this.throwError("Não foi possível encontrar a organização.", 400);
            return;
        }

        const organization = new Organization(organizationData);

        return {
            adoption: { ...adoption },
            organization: { ...organization },
            animal: { ...animal },
            adopter: { ...adopter },
        };
    }
}
