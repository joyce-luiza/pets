import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Animal } from '../../../app/domains';
import { AnimalAdapter } from '../../../app/domains/adapters';

/**
 * Set animal status to Inactive
 *
 * @extends AbstractStrategy
 */
export default class DeleteLogicallyByAnimalIdStrategy extends AbstractStrategy {
  /**
   *
   * @param {AnimalRepository} animalRepository
   */
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   *
   * @param {Animal} data - The data object containing id property.
   */
  async execute({ id }) {
    console.log('id');
    console.log(id);
    const updatedAnimal = await this.animalRepository.deleteLogicallyById(id);

    if (!updatedAnimal) {
      this.throwError('Não foi possível desativar o registro do animal.');
    }
  }
}
