import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";

/**
 * Strategy to validade required Adopter fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAdopterRequiredFieldsStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {Adopter} data - Adopter domain object
   */
  async execute(data) {
    const generateError = (fieldName) => {
      this.throwError(
        `O campo '${fieldName}' é obrigatório e não foi informado.`,
        400
      );
    };

    if (!data.firstName) {
      generateError("Primeiro nome");
    }
    if (!data.lastName) {
      generateError("Sobrenome");
    }
    if (!data.birthDate) {
      generateError("Data de nascimento");
    }
    if (!data.email) {
      generateError("E-mail");
    }
    if (!data.password) {
      generateError("Senha");
    }
    if (!data.phoneNumber) {
      generateError("Número de telefone");
    }
  }
}
