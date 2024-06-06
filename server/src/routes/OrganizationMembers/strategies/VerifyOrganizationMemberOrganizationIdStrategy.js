import AbstractStrategy from "../../../app/abstract/AbstractStrategy";

/** *
 * @extends AbstractStrategy
 */
export default class VerifyOrganizationMemberOrganizationIdStrategy extends AbstractStrategy {
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {Object} data - The data object containing id property.
     * @param {Object} loggedUserInfo - The logged-in user's information.
     * @throws {Error} Throws an error if the member does not have permission.
     */

    async execute(data, dto, loggedUserInfo) {
        // Retrieve the member performing the action
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

        return;
    }
}
