import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    OrganizationRepository,
    AddressRepository,
} from "../../../app/repositories";
import { Address } from "../../../app/domains";

/**
 * Strategy to update an Organization Address
 *
 * @extends AbstractStrategy
 */
export default class UpdateOrganizationAddressStrategy extends AbstractStrategy {
    /**
     * @param {AddressRepository} addressRepository - An instance of AbstractRepository
     */
    constructor(addressRepository) {
        super();
        this.addressRepository = addressRepository;
    }

    /**
     * @param {Address} data - Address domain object
     */
    async execute(data) {
        const updated = await this.addressRepository.update(data, {
            id: data.id,
            organizationId: data.organizationId,
        });
        if (!updated) {
            this.throwError("Erro ao atualizar o endereço da organização");
            return;
        }

        const address = await this.addressRepository.findById(data.id);

        const result = new Address(address);
        return result;
    }
}
