import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Animal } from '../../../app/domains';

/**
 * Format result to Animal domain
 *
 * @extends AbstractStrategy
 */
export default class FormatToAnimalDomainStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  async execute(_, dto) {
    let result = {};

    if (dto) {
      result = new Animal(dto);
    }

    return result;
  }
}
