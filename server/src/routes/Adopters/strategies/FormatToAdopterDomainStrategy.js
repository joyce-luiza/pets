import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Adopter } from '../../../app/domains';

/**
 * Format result to Adopter domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToAdopterDomainStrategy extends AbstractStrategy {
	constructor() {
		super();
	}

	async execute(_, dto) {
		let result = {};

		if (dto) {
			result = new Adopter(dto);
		}

		return result;
	}
}
