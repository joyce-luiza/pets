import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { OrganizationMember } from "../../../app/domains";

/**
 * Strategy to update an Organization Member Role
 *
 * @extends AbstractStrategy
 */
export default class UpdateMemberRoleStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationMemberRepository} organizationMemberRepository - An instance of AbstractRepository
     */
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {OrganizationMember} data - Organization Member domain object
     * @param {Object} dto - Data transfer object (not used)
     * @param {Object} loggedUserInfo - Information about the logged-in user (not used)
     */

    async execute(data) {
        // Attempt to update the organization member in the repository
        const updated = await this.organizationMemberRepository.update(data, {
            id: data.id,
        });

        // If the update failed, throw an error
        if (!updated) {
            this.throwError("Erro ao atualizar as informações da organização");
            return;
        }

        // Retrieve the updated member from the repository
        const updatedMember = await this.organizationMemberRepository.findById(
            data.id
        );

        const result = new OrganizationMember(updatedMember);

        return result;
    }
}
