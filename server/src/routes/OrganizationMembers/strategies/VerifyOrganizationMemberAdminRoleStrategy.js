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
     * @param {String} role - The member role
     * @throws {Error} Throws an error if the member is not an admin.
     */

    async execute(role) {
        // Check if the member performing the action has admin permission
        if (role !== MEMBER_ROLE.ADMIN) {
            this.throwError("Você não tem permissão para executar essa ação.");
            return;
        }

        return;
    }
}
