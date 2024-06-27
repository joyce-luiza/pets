import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    Adopter,
    Address,
    AdopterLifestyle,
    AdopterPreference,
} from "../../../app/domains";

/**
 * Strategy to get adoption by id.
 *
 * @extends AbstractStrategy
 */
export default class GetAdoptionAdopterStrategy extends AbstractStrategy {
    constructor(adopterRepository, addressRepository, lifestyleRepository) {
        super();
        this.adopterRepository = adopterRepository;
        this.addressRepository = addressRepository;
        this.lifestyleRepository = lifestyleRepository;
    }

    /**
     * @param {String} id - The data object containing adoption id.
     */
    async execute(data, dto) {
        const { adopterId } = dto.adoption;

        // Get adopter
        const adopter = await this.adopterRepository.findActiveAdopterById(
            adopterId
        );

        // Get adopter preferences
        const preferences =
            await this.adopterRepository.getPreferencesByAdopterId(adopterId);

        // Get adopter address
        const address = await this.addressRepository.findByProp(
            "adopterId",
            adopterId
        );

        // Get adopter lifestyle
        const lifestyle = await this.lifestyleRepository.findById(adopterId);

        return {
            adoption: dto.adoption,
            animal: dto.animal,
            adopter: new Adopter(adopter),
            preferences: new AdopterPreference(preferences),
            address: new Address(address),
            lifestyle: new AdopterLifestyle(lifestyle),
        };
    }
}
