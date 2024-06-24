import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { AnimalFile } from '../../../app/domains';

/**
 * Strategy to search for an active animal by id along with its files.
 *
 * @extends AbstractStrategy
 */
export default class FindAnimalWithFilesByIdStrategy extends AbstractStrategy {
  constructor(animalRepository, animalFileRepository) {
    super();
    this.animalRepository = animalRepository;
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * Find animal by id along with its files
   *
   * @param {AdopterComplement} data - The data object containing id property.
   * @param {string} data.id - The animal id.
   * @throws {Error} Throws an error if the animal doesn't exist.
   */
  async execute({ id }) {
    const animal = await this.animalRepository.findById(id);

    const animalWithFiles = await this.animalRepository.getWithFilesById(
      animal
    );

    // Combine the results
    return animalWithFiles;
  }
}
