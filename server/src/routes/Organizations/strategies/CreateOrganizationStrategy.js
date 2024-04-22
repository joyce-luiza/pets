import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";

/**
 * Strategy to create an Organization
 *
 * @extends AbstractStrategy
 */
export default class CreateOrganizationStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationRepository} organizationRepository - An instance of AbstractRepository
     */
    constructor(organizationRepository) {
        super();
        this.organizationRepository = organizationRepository;
    }

    /**
     * @param {Organization} data - Organization domain object
     */
    async execute(data) {
        const org = await this.organizationRepository.createOrganization(data);

        if (!org) {
            this.throwError("Erro ao criar a conta");
        }

        const result = new Organization(org);
        return result;
    }
}
