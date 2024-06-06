import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { MEMBER_ROLE } from "../../../constants";

/**
 * @extends AbstractStrategy
 */
export default class VerifyOrganizationMemberAdminRoleStrategy extends AbstractStrategy {
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }
    /**
     * @param {String} id - The member id.
     * @throws {Error} Throws an error if the member is not an admin.
     */

    async execute(id) {
        // Retrieve the member performing the action
        const member = await this.organizationMemberRepository.findById(id);

        // Check if the member performing the action has admin permission
        if (member.role !== MEMBER_ROLE.ADMIN) {
            this.throwError("Você não tem permissão para executar essa ação.");
            return;
        }

        return;
    }
}
