import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement, Adopter, Address } from "../../../app/domains";

/**
 * Strategy to create adopter Address record.
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAddressStrategy extends AbstractStrategy {
    constructor(addressRepository) {
        super();
        this.addressRepository = addressRepository;
    }

    /**
     * Create adopter address
     *
     * @param {AdopterComplement} data - The data object containing address property.
     * @param {Address} data.address - The object containing address properties.
     * @param {Adopter} dto - The adopter object.
     * @throws {Error} Throws an error if was impossible to register adopter's adress.
     */
    async execute({ adopter, address }, dto) {
        const adopterAddress = await this.addressRepository.create({
            ...address,
            adopterId: dto.id,
            organizationId: null,
        });

        if (!adopterAddress) {
            this.throwError(
                "Não foi possível realizar a criação do endereço do adotante"
            );
        }

        const result = new AdopterComplement({
            adopter,
            address: adopterAddress,
        });

        return result;
    }
}
