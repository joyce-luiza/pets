import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";

/**
 * Strategy to delete an Organization
 *
 * @extends AbstractStrategy
 */
export default class DeleteLogicallyByOrganizationIdStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationRepository} organizationRepository - An instance of AbstractRepository
     */
    constructor(organizationRepository) {
        super();
        this.organizationRepository = organizationRepository;
    }

    /**
     * @param {Organization} data - The data object containing id property
     * @param {string} data.id - The id of the organization
     */

    async execute({ id }) {
        // Attempt to logically delete the organization by id
        const deletedOrg =
            await this.organizationRepository.deleteLogicallyById(id);

        // If the deletion failed, throw an error
        if (!deletedOrg) {
            this.throwError("Erro ao desativar a organização.");
            return;
        }

        return deletedOrg;
    }
}
