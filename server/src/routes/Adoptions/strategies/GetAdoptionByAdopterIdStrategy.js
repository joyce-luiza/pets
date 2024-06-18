import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adoption, Animal } from "../../../app/domains";
import AnimalAdapter from "../../../app/domains/adapters/AnimalAdapter";

/**
 * Strategy to get adoptions by adopter id
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionByAdopterIdStrategy extends AbstractStrategy {
    constructor(adoptionRepository, animalRepository, animalFileRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
        this.animalFileRepository = animalFileRepository;
    }

    /**
     * @param {String} id - Adopter Id
     */
    async execute({ id }) {
        let result = [];

        // Fetch all adoptions by adopter ID
        const adoptions = await this.adoptionRepository.findAllWithProperties({
            adopterId: id,
        });

        if (adoptions.length) {
            // Fetch animal details and files for each adoption
            result = await Promise.all(
                adoptions.map(async (adoption) => {
                    const animal = await this.animalRepository.findById(
                        adoption.animalId
                    );

                    const animalWithFiles =
                        await this.animalRepository.getWithFilesById(animal);

                    console.log(animalWithFiles);

                    return {
                        ...new Adoption(adoption),
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
