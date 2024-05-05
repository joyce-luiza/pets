import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { MINIMUM_AGE } from "../../../constants";

/**
 * Strategy to validate if a person's age is above 18 years.
 *
 * @extends AbstractStrategy
 */
export default class ValidateAdopterAgeStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * Compare the birth date with today to determine if the person is at least 18 years old.
   *
   * @param {Adopter} data - The data object containing birthDate property.
   * @param {Date} data.birthDate - The birth date in the format 'YYYY-MM-DD'.
   * @throws {Error} Throws an error if the person's age is less than 18.
   */
  async execute({ birthDate }) {
    if (
      new Date().getFullYear() - new Date(birthDate).getFullYear() <
      MINIMUM_AGE
    ) {
      this.throwError(`Idade mínima: ${MINIMUM_AGE} anos`, 400);
      return;
    }
  }
}
