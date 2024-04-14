import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { STATUS } from "../../../constants";

/**
 * Strategy to validate if adopter's email already exists.
 *
 * @extends AbstractStrategy
 */
export default class ValidateEmailExistenceStrategy extends AbstractStrategy {
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  /**
   * Verify email existence on Adopters table
   *
   * @param {Adopter} data - The data object containing email property.
   * @param {string} data.email - The adopter email.
   * @throws {Error} Throws an error if the adopter's email already existence.
   */
  async execute({ email }) {
    const adopter = await this.adopterRepository.countGeneric({
      where: { email },
    });

    if (adopter) {
      this.throwError("O email informado já está em uso.");
    }
  }
}
