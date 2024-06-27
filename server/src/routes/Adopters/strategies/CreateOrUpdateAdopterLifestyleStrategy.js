import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { LifestyleRepository } from "../../../app/repositories";
import { AdopterLifestyleAdapter } from "../../../app/domains/adapters";
import { AdopterComplement } from "../../../app/domains";

/**
 * Get authenticated adopter lifestyle
 *
 * @extends AbstractStrategy
 */
export default class CreateOrUpdateAdopterLifestyleStrategy extends AbstractStrategy {
  /**
   *
   * @param {LifestyleRepository} lifestyleRepository
   */
  constructor(lifestyleRepository) {
    super();
    this.lifestyleRepository = lifestyleRepository;
  }

  /**
   *
   * @param {AdopterComplement} data
   * @param {*} dto
   * @param {*} loggedUserInfo
   */
  async execute({ lifestyle }, dto, loggedUserInfo) {
    const adopterLifestyle = await this.lifestyleRepository.findByProp(
      "adopterId",
      loggedUserInfo.userId
    );

    if (adopterLifestyle) {
      await this.lifestyleRepository.update(lifestyle, {
        id: adopterLifestyle.id,
      });

      const newLifestyle = await this.lifestyleRepository.findByProp(
        "adopterId",
        loggedUserInfo.userId
      );

      return new AdopterLifestyleAdapter(newLifestyle);
    }

    const newLifestyle = await this.lifestyleRepository.create({
      ...lifestyle,
      adopterId: loggedUserInfo.userId,
    });

    return new AdopterLifestyleAdapter(newLifestyle);
  }
}
