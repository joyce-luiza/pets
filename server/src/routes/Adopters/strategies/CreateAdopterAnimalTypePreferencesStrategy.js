import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement } from "../../../app/domains";
import {
  AnimalTypeRepository,
  AdopterAnimalTypePreferenceRepository,
} from "../../../app/repositories";

/**
 * Strategy to create AdopterAnimalTypePreference records
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAnimalTypePreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterAnimalTypePreferenceRepository} adopterAnimalTypePreferenceRepository - An instance of AbstractRepository
   * @param {AnimalTypeRepository} animalTypeRepository - An instance of AbstractRepository
   */
  constructor(adopterAnimalTypePreferenceRepository, animalTypeRepository) {
    super();
    this.adopterAnimalTypePreferenceRepository =
      adopterAnimalTypePreferenceRepository;
    this.animalTypeRepository = animalTypeRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain
   * @param {AdopterComplement} dto - AdopterComplement domain
   */
  async execute({ preferences }, dto) {
    const allAnimalTypes = await this.animalTypeRepository.findAll();

    if (!allAnimalTypes.length) {
      this.throwError("Não foi possível recuperar os tipos de animais.");
    }

    if (preferences.animalTypes === null) {
      return;
    }

    const objectsToCreate = Object.keys(preferences.animalTypes).map(
      (animalTypeKey) => {
        const animalType = allAnimalTypes.find(
          (animalType) => animalType.title === animalTypeKey
        );
        return {
          adopterPreferenceId: dto.preferences.id,
          animalTypeId: animalType.id,
        };
      }
    );

    if (!objectsToCreate.length) {
      this.throwError(
        "Erro ao mapear as preferências relacionadas aos tipos de animais."
      );
    }

    const adopterAnimalTypes =
      await this.adopterAnimalTypePreferenceRepository.bulkCreate(
        objectsToCreate
      );

    if (!adopterAnimalTypes.length) {
      this.throwError(
        "Não foi possível criar as preferências relacionadas aos tipos de animais."
      );
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: { ...dto.preferences, animalTypes: adopterAnimalTypes },
    });

    return result;
  }
}
