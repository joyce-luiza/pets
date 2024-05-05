import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement, AdopterLifestyle } from "../../../app/domains";

/**
 * Strategy to validade required AdopterLifestyle fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAdopterLifestyleRequiredFields extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {AdopterComplement} data - Object containing adopter lifestyle information
   * @param {AdopterLifestyle} data.lifestyle - Object containing specific AdopterLifestyle information
   */
  async execute({ lifestyle }) {
    const generateError = (fieldName) => {
      this.throwError(
        `O campo '${fieldName}' é obrigatório e não foi informado.`,
        400
      );
    };

    const invalidValues = [null, undefined];

    if (invalidValues.includes(lifestyle.totalPets)) {
      generateError("Quantidade de animais");
    }

    if (!lifestyle.routine) {
      generateError("Rotina");
    }

    if (!lifestyle.travelFrequency) {
      generateError("Frequência de viagens");
    }
  }
}
