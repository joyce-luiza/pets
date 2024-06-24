import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement } from "../../../app/domains";
import { AdopterAnimalSexPreferenceRepository } from "../../../app/repositories";

/**
 * Strategy to create AdopterAnimalSexPreferences records
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAnimalSexPreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterAnimalSexPreferenceRepository} adopterAnimalSexPreferenceRepository - An instance of AbstractRepository
   */
  constructor(adopterAnimalSexPreferenceRepository) {
    super();
    this.adopterAnimalSexPreferenceRepository =
      adopterAnimalSexPreferenceRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain
   * @param {AdopterComplement} dto - AdopterComplement domain
   */
  async execute({ preferences }, dto) {
    if (
      preferences.animalSexes === null ||
      !Object.keys(preferences.animalSexes).length
    ) {
      return;
    }

    const objectsToCreate = Object.keys(preferences.animalSexes).map(
      (animalSexKey) => {
        return {
          adopterPreferenceId: dto.preferences.id,
          animalSex: animalSexKey,
        };
      }
    );

    if (!objectsToCreate.length) {
      this.throwError(
        "Erro ao mapear as preferências relacionadas ao sexo dos animais."
      );
    }

    const adopterAnimalSexes =
      await this.adopterAnimalSexPreferenceRepository.bulkCreate(
        objectsToCreate
      );

    if (!adopterAnimalSexes.length) {
      this.throwError(
        "Não foi possível criar as preferências relacionadas ao sexo dos animais."
      );
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: { ...dto.preferences, animalSexes: adopterAnimalSexes },
    });

    return result;
  }
}
