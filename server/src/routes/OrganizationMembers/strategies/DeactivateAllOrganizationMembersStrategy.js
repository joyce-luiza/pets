import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { Organization } from "../../../app/domains";

/**
 * Strategy to deactive all organization members
 *
 * @extends AbstractStrategy
 */
export default class DeactivateAllOrganizationMembersStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationMemberRepository} organizationMemberRepository - An instance of AbstractRepository
     */
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * Deactivates all members of an organization based on id
     *
     * @param {Organization} data - The data object containing id property
     * @param {string} data.id - The id of the organization
     */

    async execute({ id }) {
        const updated = await this.organizationMemberRepository.update(
            {
                statusId:
                    await this.organizationMemberRepository.getInactiveStatusId(),
            },
            { organizationId: id }
        );

        if (!updated) {
            this.throwError(`Não foi possível desativar os membros.`);
        }
    }
}
