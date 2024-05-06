import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Organization } from "../../../app/domains";

/**
 * Format result to Organization domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToOrganizationDomainStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    async execute(_, dto) {
        let result = {};

        if (dto) {
            result = new Organization(dto);
        }

        return result;
    }
}
