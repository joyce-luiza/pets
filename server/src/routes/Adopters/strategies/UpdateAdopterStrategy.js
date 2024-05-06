import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdopterRepository } from "../../../app/repositories";
import { Adopter } from "../../../app/domains";
import sanitize from "../../../app/utils/sanitize";

/**
 * Strategy to update an Adopter
 *
 * @extends AbstractStrategy
 */
export default class UpdateAdopterStrategy extends AbstractStrategy {
  /**
   * @param {AdopterRepository} adopterRepository - An instance of AbstractRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  /**
   * @param {Adopter} data - Adopter domain object
   */
  async execute(data) {
    const updated = await this.adopterRepository.update(data, {
      id: data.id,
    });

    if (!updated) {
      this.throwError("Erro ao atualizar as informações da conta do adotante");
      return;
    }

    const adopter = await this.adopterRepository.findById(data.id);

    const result = new Adopter(adopter);
    return result;
  }
}
