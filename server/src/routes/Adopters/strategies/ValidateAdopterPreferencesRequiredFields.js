import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement, AdopterPreference } from "../../../app/domains";

/**
 * Strategy to validade required AdopterPreference fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAdopterPreferencesRequiredFields extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {AdopterComplement} data - Object containing adopter preferences information
   * @param {AdopterPreference} data.preferences - Object containing specific AdopterPreference information
   */
  async execute({ preferences }) {
    const generateError = (fieldName) => {
      this.throwError(
        `O campo '${fieldName}' é obrigatório e não foi informado.`,
        400
      );
    };
    const preferencesKeys = Object.keys(preferences);

    if (!preferencesKeys.includes("animalTypes")) {
      generateError("Tipos de animal");
    }

    if (!preferencesKeys.includes("animalAgeGroups")) {
      generateError("Grupos de idade do animal");
    }

    if (!preferencesKeys.includes("animalSizes")) {
      generateError("Tamanhos de animal");
    }

    if (!preferencesKeys.includes("animalSexes")) {
      generateError("Sexo do animal");
    }

    if (!preferencesKeys.includes("animalColors")) {
      generateError("Cores de animal");
    }
  }
}
