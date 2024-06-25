import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement } from "../../../app/domains";
import {
  AnimalSizeRepository,
  AdopterAnimalSizePreferencesRepository,
} from "../../../app/repositories";

/**
 * Strategy to create AdopterAnimalSizePreferences records
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAnimalSizePreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterAnimalSizePreferencesRepository} adopterAnimalSizePreferencesRepository - An instance of AbstractRepository
   * @param {AnimalSizeRepository} animalSizeRepository - An instance of AbstractRepository
   */
  constructor(adopterAnimalSizePreferencesRepository, animalSizeRepository) {
    super();
    this.adopterAnimalSizePreferencesRepository =
      adopterAnimalSizePreferencesRepository;
    this.animalSizeRepository = animalSizeRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain
   * @param {AdopterComplement} dto - AdopterComplement domain
   */
  async execute({ preferences }, dto) {
    const allAnimalSizes = await this.animalSizeRepository.findAll();

    if (!allAnimalSizes.length) {
      this.throwError("Não foi possível recuperar os tamanhos de animais.");
    }

    if (
      preferences.animalSizes === null ||
      !Object.keys(preferences.animalSizes).length
    ) {
      return;
    }

    const objectsToCreate = Object.keys(preferences.animalSizes).map(
      (animalSizeKey) => {
        const animalSize = allAnimalSizes.find(
          (animalSize) => animalSize.title === animalSizeKey
        );
        return {
          adopterPreferenceId: dto.preferences.id,
          animalSizeId: animalSize.id,
        };
      }
    );

    if (!objectsToCreate.length) {
      this.throwError(
        "Erro ao mapear as preferências relacionadas aos tamanho de animais."
      );
    }

    const adopterAnimalSizes =
      await this.adopterAnimalSizePreferencesRepository.bulkCreate(
        objectsToCreate
      );

    if (!adopterAnimalSizes.length) {
      this.throwError(
        "Não foi possível criar as preferências relacionadas aos tamanho de animais."
      );
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: { ...dto.preferences, animalSizes: adopterAnimalSizes },
    });

    return result;
  }
}
