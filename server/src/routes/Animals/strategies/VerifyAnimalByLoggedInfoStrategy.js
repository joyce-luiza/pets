import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";

/**
 * Verify if logged adopter has the same id was sent
 *
 * @extends AbstractStrategy
 */
export default class VerifyAdopterByLoggedInfoStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   *
   * @param {Adopter} data - The data object containing id property.
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
