import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { AdopterRepository } from "../../../app/repositories";

/**
 * Set adopter status to Inactive
 *
 * @extends AbstractStrategy
 */
export default class DeleteLogicallyByAdopterIdStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  /**
   *
   * @param {Adopter} data - The data object containing id property.
   */
  async execute({ id }) {
    const updatedAdopter = await this.adopterRepository.deleteLogicallyById(id);

    if (!updatedAdopter) {
      this.throwError("Não foi possível desativar a conta.");
    }
  }
}
