import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement } from "../../../app/domains";
import {
  AnimalColorRepository,
  AdopterAnimalColorPreferencesRepository,
} from "../../../app/repositories";

/**
 * Strategy to create AdopterAnimalColorPreferences records
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAnimalColorPreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterAnimalColorPreferencesRepository} adopterAnimalColorPreferencesRepository - An instance of AbstractRepository
   * @param {AnimalColorRepository} animalColorRepository - An instance of AbstractRepository
   */
  constructor(adopterAnimalColorPreferencesRepository, animalColorRepository) {
    super();
    this.adopterAnimalColorPreferencesRepository =
      adopterAnimalColorPreferencesRepository;
    this.animalColorRepository = animalColorRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain
   * @param {AdopterComplement} dto - AdopterComplement domain
   */
  async execute({ preferences }, dto) {
    const allAnimalColors = await this.animalColorRepository.findAll();

    if (!allAnimalColors.length) {
      this.throwError("Não foi possível recuperar as cores de animais.");
    }

    if (preferences.animalColors === null) {
      return;
    }

    const objectsToCreate = Object.keys(preferences.animalColors).map(
      (animalColorKey) => {
        const animalColor = allAnimalColors.find(
          (animalColor) => animalColor.title === animalColorKey
        );
        return {
          adopterPreferenceId: dto.preferences.id,
          animalColorId: animalColor.id,
        };
      }
    );

    if (!objectsToCreate.length) {
      this.throwError(
        "Erro ao mapear as preferências relacionadas as cores de animais."
      );
    }

    const adopterAnimalColors =
      await this.adopterAnimalColorPreferencesRepository.bulkCreate(
        objectsToCreate
      );

    if (!adopterAnimalColors.length) {
      this.throwError(
        "Não foi possível criar as preferências relacionadas as cores de animais."
      );
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: { ...dto.preferences, animalColors: adopterAnimalColors },
    });

    return result;
  }
}
