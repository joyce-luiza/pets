import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AddressRepository } from "../../../app/repositories";
import { Address } from "../../../app/domains";

/**
 * @extends AbstractStrategy
 */
export default class GetOrganizationAddressStrategy extends AbstractStrategy {
    /**
     * @param {AddressRepository} addressRepository
     */
    constructor(addressRepository) {
        super();
        this.addressRepository = addressRepository;
    }

    /**
     * @param {Address} address
     * @param {string} organizationId
     * @throws {Error}
     */

    async execute({ id }) {
        const organizationId = id;
        const address = await this.addressRepository.findByProp(
            "organizationId",
            organizationId
        );

        return address;
    }
}
