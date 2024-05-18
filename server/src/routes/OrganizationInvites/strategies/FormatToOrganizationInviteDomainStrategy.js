import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInvite } from "../../../app/domains";

/**
 * Format result to OrganizationInvite domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToOrganizationInviteDomainStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    async execute(_, dto) {
        let result = {};

        if (dto) {
            result = new OrganizationInvite(dto);
        }

        return result;
    }
}
