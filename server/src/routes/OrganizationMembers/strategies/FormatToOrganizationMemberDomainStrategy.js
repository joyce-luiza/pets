import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";

/**
 * Format result to OrganizationMember domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToOrganizationMemberDomainStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    async execute(_, dto) {
        let result = {};

        if (dto) {
            result = new OrganizationMember(dto);
        }

        return result;
    }
}
