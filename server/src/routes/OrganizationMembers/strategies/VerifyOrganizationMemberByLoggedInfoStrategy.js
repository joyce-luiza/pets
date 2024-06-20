import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";

/**
 * Verify if logged member has the same id was sent
 *
 * @extends AbstractStrategy
 */
export default class VerifyOrganizationMemberByLoggedInfoStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    /**
     * @param {OrganizationMember} data - The data object containing id property.
     */

    async execute({ id }, dto, loggedUserInfo) {
        if (id !== loggedUserInfo.userId) {
            this.throwError(
                "O usuário atual não tem permissão para realizar esta operação.",
                400
            );
        }
    }
}
