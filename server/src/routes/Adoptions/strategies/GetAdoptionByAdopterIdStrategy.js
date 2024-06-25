import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Address, Adoption, Organization } from "../../../app/domains";
import AnimalAdapter from "../../../app/domains/adapters/AnimalAdapter";
import { AdoptionResult } from "../../../app/domains/result";

/**
 * Strategy to get adoptions by adopter id
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionByAdopterIdStrategy extends AbstractStrategy {
    constructor(
        adoptionRepository,
        animalRepository,
        animalFileRepository,
        organizationRepository,
        addressRepository,
        resultRepository
    ) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
        this.animalFileRepository = animalFileRepository;
        this.organizationRepository = organizationRepository;
        this.addressRepository = addressRepository;
        this.resultRepository = resultRepository;
    }

    /**
     * @param {String} id - Adopter Id
     */
    async execute({ id }) {
        let result = [];

        // Get all adoptions by adopter ID
        const adoptions = await this.adoptionRepository.findAllWithProperties({
            adopterId: id,
        });

        if (adoptions.length) {
            // Get animal details and files for each adoption
            result = await Promise.all(
                adoptions.map(async (adoption) => {
                    const animal = await this.animalRepository.findById(
                        adoption.animalId
                    );

                    const animalWithFiles =
                        await this.animalRepository.getWithFilesById(animal);

                    const adoptionData = {
                        ...new Adoption(adoption),
                        result: await this.resultRepository.getResultTitleById(
                            adoption.resultId
                        ),
                    };

                    const organizationData =
                        await this.organizationRepository.findById(
                            animal.organizationId
                        );

                    const addressData = await this.addressRepository.findByProp(
                        "organizationId",
                        animal.organizationId
                    );

                    return {
                        ...new AdoptionResult(adoptionData),
                        address: new Address(addressData),
                        organization: new Organization(organizationData),
                        animal: animal
                            ? new AnimalAdapter(animalWithFiles)
                            : null,
                    };
                })
            );
        }

        return result;
    }
}
