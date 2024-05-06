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
     * @param {Organization} organization
     * @param {string} organization.cnpj
     * @throws {Error}
     */

    async execute(organization) {
        const cnpj = organization.cnpj;
        const org = await this.organizationRepository.countGeneric({
            where: { cnpj },
        });

        if (org) {
            this.throwError("O CNPJ informado já está cadastrado.");
        }
    }
}
