import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Address, Organization } from "../../../app/domains";
import AnimalAdapter from "../../../app/domains/adapters/AnimalAdapter";

/**
 * Strategy to get animal details
 *
 * @extends AbstractStrategy
 */
export default class GetAnimalDetailsByIdStrategy extends AbstractStrategy {
    constructor(animalRepository, organizationRepository, addressRepository) {
        super();
        this.animalRepository = animalRepository;
        this.organizationRepository = organizationRepository;
        this.addressRepository = addressRepository;
    }

    /**
     * @param {String} id - Animal Id
     */
    async execute({ id }) {
        // Get animal with files
        const animal = await this.animalRepository.getWithFilesById({
            id: id,
        });

        // Get organization
        const organization = await this.organizationRepository.findById(
            animal.organizationId
        );

        // Get organization address
        const address = await this.addressRepository.findByProp(
            "organizationId",
            organization.id
        );

        return {
            animal: new AnimalAdapter(animal),
            organization: new Organization(organization),
            address: new Address(address),
        };
    }
}
