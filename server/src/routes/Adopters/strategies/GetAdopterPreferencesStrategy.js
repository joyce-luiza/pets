import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterRepository } from "../../../app/repositories";
import { AdopterPreferencesAdapter } from "../../../app/domains/adapters";

/**
 * Get authenticated adopter preferences
 *
 * @extends AbstractStrategy
 */
export default class GetAdopterPreferencesStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  async execute(data = null, dto, loggedUserInfo) {
    if (!loggedUserInfo.userId)
      this.throwError("Usuário sem permissão para acessar esse registro.", 401);

    const preferences = await this.adopterRepository.getPreferencesByAdopterId(
      loggedUserInfo.userId
    );

    return new AdopterPreferencesAdapter(preferences);
  }
}
