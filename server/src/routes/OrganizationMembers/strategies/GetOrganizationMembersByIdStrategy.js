import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";
import { STATUS } from "../../../constants";

/**
 * Strategy to get organization members.
 *
 * @extends AbstractStrategy
 */
export default class GetOrganizationMembersByIdStrategy extends AbstractStrategy {
    constructor(organizationRepository) {
        super();
        this.organizationRepository = organizationRepository;
    }

    /**
     * @param {String} id - The data object containing organization id.
     */
    async execute({ id }) {
        const orgMembers =
            await this.organizationRepository.findMembersByOrganizationId(id);

        return orgMembers;
    }
}
