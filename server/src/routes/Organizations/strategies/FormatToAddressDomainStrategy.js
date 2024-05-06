import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Address } from "../../../app/domains";

/**
 * Format result to Address domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToAddressDomainStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    async execute(_, dto) {
        let result = {};

        if (dto) {
            result = new Address(dto);
        }

        return result;
    }
}
