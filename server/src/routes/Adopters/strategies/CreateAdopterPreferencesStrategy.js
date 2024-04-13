import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
  AdopterComplement,
  AdopterPreference,
  LoggedUser,
} from "../../../app/domains";
import { AdopterPreferenceRepository } from "../../../app/repositories";

/**
 * Strategy to create an AdopterPreference record
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterPreferencesStrategy extends AbstractStrategy {
  /**
   * @param {AdopterPreferenceRepository} adopterPreferenceRepository - An instance of AbstractRepository
   */
  constructor(adopterPreferenceRepository) {
    super();
    this.adopterPreferenceRepository = adopterPreferenceRepository;
  }

  /**
   * @param {LoggedUser} loggedUserInfo - LoggedUser domain
   */
  async execute(data, dto, loggedUserInfo) {
    const adopterPreference = await this.adopterPreferenceRepository.create({
      adopterId: loggedUserInfo.userId,
    });

    if (!adopterPreference) {
      this.throwError("Erro ao criar as preferências do adotante.");
    }

    const result = new AdopterComplement({
      ...dto,
      preferences: adopterPreference,
    });

    return result;
  }
}
