import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";
import sanitize from "../../../app/utils/sanitize";

/**
 * Strategy to update an Organization
 *
 * @extends AbstractStrategy
 */
export default class UpdateOrganizationStrategy extends AbstractStrategy {
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
        const updated = await this.organizationRepository.update(data, {
            id: data.id,
        });
        if (!updated) {
            this.throwError("Erro ao atualizar as informações da organização");
            return;
        }

        const organization = await this.organizationRepository.findById(
            data.id
        );

        const result = new Organization(organization);
        return result;
    }
}
