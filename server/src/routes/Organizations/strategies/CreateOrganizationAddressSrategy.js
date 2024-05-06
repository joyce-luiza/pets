import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationComplement } from "../../../app/domains";

/**
 * Strategy to create organization Address record.
 *
 * @extends AbstractStrategy
 */
export default class CreateOrganizationAddressStrategy extends AbstractStrategy {
    constructor(addressRepository) {
        super();
        this.addressRepository = addressRepository;
    }

    async execute({ organization, address }) {
        const organizationAddress = await this.addressRepository.create({
            ...address,
            organizationId: organization.id,
            adopterId: null,
        });

        if (!organizationAddress) {
            this.throwError(
                "Não foi possível realizar a criação do endereço da organização."
            );
        }

        const result = new OrganizationComplement({
            organization,
            address: organizationAddress,
        });

        return result;
    }
}
