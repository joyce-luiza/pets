import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
  Address,
  AdopterComplement,
  AdopterLifestyle,
} from "../../../app/domains";

/**
 * Strategy to validade required fields to update user address
 *
 * @extends AbstractStrategy
 */
export default class ValidateRequiredFieldsToUpdateAddress extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {Address} data - Object containing the new address information
   */
  async execute(data, dto, loggedUserInfo) {
    const generateError = () => {
      this.throwError(`Campo obrigatório não foi informado.`, 400);
    };

    if (!data.residenceType) {
      generateError();
    }

    if (!data.cep) {
      generateError();
    }

    if (!data.street) {
      generateError();
    }

    if (!data.number) {
      generateError();
    }

    if (!data.city) {
      generateError();
    }

    if (!data.state) {
      generateError();
    }

    if (!loggedUserInfo.userId) {
      generateError();
    }
  }
}
