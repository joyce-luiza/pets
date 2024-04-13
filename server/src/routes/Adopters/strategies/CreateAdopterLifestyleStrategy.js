import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { LifestyleRepository } from "../../../app/repositories";
import { AdopterComplement } from "../../../app/domains";

/**
 * Strategy to create an AdopterLifestyle
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterLifestyleStrategy extends AbstractStrategy {
  /**
   * @param {LifestyleRepository} lifestyleRepository - An instance of AbstractRepository
   */
  constructor(lifestyleRepository) {
    super();
    this.lifestyleRepository = lifestyleRepository;
  }

  /**
   * @param {AdopterComplement} data - AdopterComplement domain object
   */
  async execute({ lifestyle }, dto, loggedUserInfo) {
    if (!lifestyle) {
      this.throwError("Os parâmetros de estilo de vida não foram informados.");
    }

    const adopterLifestyle = await this.lifestyleRepository.create({
      ...lifestyle,
      adopterId: loggedUserInfo.userId,
    });

    if (!adopterLifestyle) {
      this.throwError(
        "Erro ao criar os parâmetros de estilo de vida do adotante"
      );
    }

    const result = new AdopterComplement({
      ...dto,
      lifestyle: adopterLifestyle,
    });
    return result;
  }
}
