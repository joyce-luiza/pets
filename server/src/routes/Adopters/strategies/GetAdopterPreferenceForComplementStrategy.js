import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterPreferenceRepository } from "../../../app/repositories";
import { AdopterComplement } from "../../../app/domains";

/**
 * Get authenticated adopter preference and format to AdopterComplement
 *
 * @extends AbstractStrategy
 */
export default class GetAdopterPreferenceForComplementStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterPreferenceRepository} adopterPreferenceRepository
   */
  constructor(adopterPreferenceRepository) {
    super();
    this.adopterPreferenceRepository = adopterPreferenceRepository;
  }

  async execute(data = null, dto, loggedUserInfo) {
    if (!loggedUserInfo.userId)
      this.throwError("Usuário sem permissão para acessar esse registro.", 401);

    const preference = await this.adopterPreferenceRepository.findByProp(
      "adopterId",
      loggedUserInfo.userId
    );

    return new AdopterComplement({
      ...dto,
      preferences: preference,
    });
  }
}
