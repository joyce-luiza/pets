import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import {
  AnimalAgeGroupRepository,
  AnimalColorRepository,
  AnimalFileRepository,
  AnimalRepository,
  AnimalSizeRepository,
  AnimalTypeRepository,
  StatusesRepository,
} from '../../../app/repositories';
import { Animal } from '../../../app/domains';
import sanitize from '../../../app/utils/sanitize';

/**
 * Strategy to update an Animal
 *
 * @extends AbstractStrategy
 */
export default class UpdateAnimalStrategy extends AbstractStrategy {
  /**
   * @param {AnimalRepository} animalRepository - An instance of AnimalRepository
   */
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   * @param {Animal} data - Animal domain object
   */
  async execute(data) {
    const updated = await this.animalRepository.update(data, {
      id: data.id,
    });

    if (!updated) {
      this.throwError('Erro ao atualizar as informações do animal.');
      return;
    }

    const animal = await this.animalRepository.findById(data.id);

    const result = new Animal(animal);
    console.log('foi');
    return result;
  }
}
