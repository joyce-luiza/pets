import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";

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
        const organization = await this.organizationRepository.findById(
            data.id
        );

        if (!organization) {
            this.throwError("Não foi possível encontrar o id da organização.");
            return;
        }

        const updated = await this.organizationRepository.update(data, {
            id: data.id,
        });

        if (!updated) {
            this.throwError("Erro ao atualizar as informações da organização");
            return;
        }

        const updatedOrganization = await this.organizationRepository.findById(
            data.id
        );

        const result = new Organization(updatedOrganization);

        return result;
    }
}
