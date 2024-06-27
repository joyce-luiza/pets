import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterRepository } from "../../../app/repositories";
import { AdopterLifestyleAdapter } from "../../../app/domains/adapters";

/**
 * Get authenticated adopter lifestyle
 *
 * @extends AbstractStrategy
 */
export default class GetAdopterLifestyleStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  async execute(data = null, dto, loggedUserInfo) {
    const [lifestyle] = await this.adopterRepository.getLifestyleByAdopterId(
      loggedUserInfo.userId
    );

    return new AdopterLifestyleAdapter(lifestyle);
  }
}
