import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    Adopter,
    Address,
    AdopterLifestyle,
    AdopterPreference,
} from "../../../app/domains";

/**
 * Strategy to get adopter all information.
 *
 * @extends AbstractStrategy
 */
export default class GetAdopterAllInformationStrategy extends AbstractStrategy {
    constructor(adopterRepository, addressRepository, lifestyleRepository) {
        super();
        this.adopterRepository = adopterRepository;
        this.addressRepository = addressRepository;
        this.lifestyleRepository = lifestyleRepository;
    }

    /**
     * @param {String} id - The data object containing adopter id.
     */
    async execute({ id }) {
        // Get adopter
        const adopter = await this.adopterRepository.findActiveAdopterById(id);

        // Get adopter preferences
        const preferences =
            await this.adopterRepository.getPreferencesByAdopterId(id);

        // Get adopter address
        const address = await this.addressRepository.findByProp(
            "adopterId",
            id
        );

        // Get adopter lifestyle
        const lifestyle = await this.lifestyleRepository.findByProp(
            "adopterId",
            id
        );

        const result = {
            adopter: new Adopter(adopter),
            preferences: preferences ? new AdopterPreference(preferences) : "",
            address: address ? new Address(address) : null,
            lifestyle: lifestyle ? new AdopterLifestyle(lifestyle) : null,
        };

        return result;
    }
}
