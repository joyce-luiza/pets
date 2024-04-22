import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";

/**
 * @extends AbstractStrategy
 */
export default class ValidateCNPJExistenceStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationRepository} organizationRepository
     */
    constructor(organizationRepository) {
        super();
        this.organizationRepository = organizationRepository;
    }

    /**
     * @param {Organization} data
     * @param {string} data.cnpj
     * @throws {Error}
     */

    async execute({ cnpj }) {
        const org = await this.organizationRepository.countGeneric({
            where: { cnpj },
        });

        if (org) {
            this.throwError("O CNPJ informado já está cadastrado.");
        }
    }
}
