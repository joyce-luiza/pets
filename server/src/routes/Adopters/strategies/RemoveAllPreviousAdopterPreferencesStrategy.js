import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
  AdopterAnimalTypePreferenceRepository,
  AdopterAnimalSizePreferenceRepository,
  AdopterAnimalColorPreferenceRepository,
  AdopterAnimalSexPreferenceRepository,
  AdopterAnimalAgeGroupPreferenceRepository,
} from "../../../app/repositories";
/**
 * Remove all adopter preferences from database
 *
 * @extends AbstractStrategy
 */
export default class RemoveAllPreviousAdopterPreferencesStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterAnimalTypePreferenceRepository} adopterAnimalTypePreferenceRepository
   * @param {AdopterAnimalSizePreferenceRepository} adopterAnimalSizePreferenceRepository
   * @param {AdopterAnimalColorPreferenceRepository} adopterAnimalColorPreferenceRepository
   * @param {AdopterAnimalSexPreferenceRepository} adopterAnimalSexPreferenceRepository
   * @param {AdopterAnimalAgeGroupPreferenceRepository} adopterAnimalAgeGroupPreferenceRepository
   */
  constructor(
    adopterAnimalTypePreferenceRepository,
    adopterAnimalSizePreferenceRepository,
    adopterAnimalColorPreferenceRepository,
    adopterAnimalSexPreferenceRepository,
    adopterAnimalAgeGroupPreferenceRepository
  ) {
    super();
    this.adopterAnimalTypePreferenceRepository =
      adopterAnimalTypePreferenceRepository;
    this.adopterAnimalSizePreferenceRepository =
      adopterAnimalSizePreferenceRepository;
    this.adopterAnimalColorPreferenceRepository =
      adopterAnimalColorPreferenceRepository;
    this.adopterAnimalSexPreferenceRepository =
      adopterAnimalSexPreferenceRepository;
    this.adopterAnimalAgeGroupPreferenceRepository =
      adopterAnimalAgeGroupPreferenceRepository;
  }

  /**
   *
   * @param {*} data
   * @param {*} dto
   * @param {*} loggedUserInfo
   */
  async execute(data = null, dto, loggedUserInfo) {
    if (dto.preferences.id) {
      await this.adopterAnimalTypePreferenceRepository.destroyByProp(
        "adopterPreferenceId",
        dto.preferences.id
      );

      await this.adopterAnimalSizePreferenceRepository.destroyByProp(
        "adopterPreferenceId",
        dto.preferences.id
      );

      await this.adopterAnimalColorPreferenceRepository.destroyByProp(
        "adopterPreferenceId",
        dto.preferences.id
      );

      await this.adopterAnimalSexPreferenceRepository.destroyByProp(
        "adopterPreferenceId",
        dto.preferences.id
      );

      await this.adopterAnimalAgeGroupPreferenceRepository.destroyByProp(
        "adopterPreferenceId",
        dto.preferences.id
      );
    }
  }
}
