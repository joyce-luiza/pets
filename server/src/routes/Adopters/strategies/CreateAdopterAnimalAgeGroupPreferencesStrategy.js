import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterComplement } from "../../../app/domains";
import {
  AnimalAgeGroupRepository,
  AdopterAnimalAgeGroupPreferencesRepository,
} from "../../../app/repositories";

/**
 * Strategy to create AdopterAnimalAgeGroupPreferences records
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterAnimalAgeGroupPreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterAnimalAgeGroupPreferencesRepository} adopterAnimalAgeGroupPreferencesRepository - An instance of AbstractRepository
   * @param {AnimalAgeGroupRepository} animalAgeGroupRepository - An instance of AbstractRepository
   */
  constructor(
    adopterAnimalAgeGroupPreferencesRepository,
    animalAgeGroupRepository
  ) {
    super();
    this.adopterAnimalAgeGroupPreferencesRepository =
      adopterAnimalAgeGroupPreferencesRepository;
    this.animalAgeGroupRepository = animalAgeGroupRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain
   * @param {AdopterComplement} dto - AdopterComplement domain
   */
  async execute({ preferences }, dto) {
    const allAnimalAgeGroups = await this.animalAgeGroupRepository.findAll();

    if (!allAnimalAgeGroups.length) {
      this.throwError(
        "Não foi possível recuperar as faixas etárias de animais."
      );
    }

    if (
      preferences.animalAgeGroups === null ||
      !Object.keys(preferences.animalAgeGroups).length
    ) {
      return;
    }

    const objectsToCreate = Object.keys(preferences.animalAgeGroups).map(
      (animalAgeGroupKey) => {
        const animalAgeGroup = allAnimalAgeGroups.find(
          (animalAgeGroup) => animalAgeGroup.title === animalAgeGroupKey
        );
        return {
          adopterPreferenceId: dto.preferences.id,
          animalAgeGroupId: animalAgeGroup.id,
        };
      }
    );

    if (!objectsToCreate.length) {
      this.throwError(
        "Erro ao mapear as preferências relacionadas as faixas etárias de animais."
      );
    }

    const adopterAnimalAgeGroups =
      await this.adopterAnimalAgeGroupPreferencesRepository.bulkCreate(
        objectsToCreate
      );

    if (!adopterAnimalAgeGroups.length) {
      this.throwError(
        "Não foi possível criar as preferências relacionadas as faixas etárias de animais."
      );
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: {
        ...dto.preferences,
        animalAgeGroups: adopterAnimalAgeGroups,
      },
    });

    return result;
  }
}
