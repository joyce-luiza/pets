import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";
import { MEMBER_ROLE } from "../../../constants";

/** *
 * @extends AbstractStrategy
 */
export default class ValidateOrganizationMemberPermissionStrategy extends AbstractStrategy {
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {OrganizationMember} data - The data object containing id property.
     * @throws {Error} Throws an error if the member does not have permission.
     */

    async execute(data, dto, loggedUserInfo) {
        // Retrieve the member performing the action (admin)
        const member = await this.organizationMemberRepository.findById(
            loggedUserInfo.userId
        );

        // Retrieve the target member whose information will be edited
        const targetMember = await this.organizationMemberRepository.findById(
            data.id
        );

        // Retrieve the target member whose information will be edited
        if (targetMember.organizationId !== member.organizationId) {
            this.throwError(
                "Você não tem permissão para executar ações sobre membros de outras organizações."
            );
            return;
        }

        // Check if the member performing the action has admin permission
        if (member.role !== MEMBER_ROLE.ADMIN) {
            this.throwError("Você não tem permissão para executar essa ação.");
            return;
        }

        return;
    }
}
