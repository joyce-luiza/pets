import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { OrganizationMember } from "../../../app/domains";

/**
 * Strategy to delete an Organization Member
 *
 * @extends AbstractStrategy
 */
export default class DeleteLogicallyByOrganizationMemberIdStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationMemberRepository} organizationMemberRepository - An instance of AbstractRepository
     */
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {OrganizationMember} data - The data object containing id property
     * @param {string} data.id - The id of the organization member
     */

    async execute({ id }) {
        // Attempt to logically delete the organization member by id
        const deletedMember =
            await this.organizationMemberRepository.deleteLogicallyById(id);

        // If the deletion failed, throw an error
        if (!deletedMember) {
            this.throwError("Erro ao desativar o membro da organização.");
            return;
        }

        return deletedMember;
    }
}
