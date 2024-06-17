import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { LoggedUser } from '../../../app/domains';
/**
 * Strategy to search for an active adopter by id.
 *
 * @extends AbstractStrategy
 */
export default class FindAnimalFilesStrategy extends AbstractStrategy {
  constructor(animalFileRepository) {
    super();
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * Find adopter by id
   *
   * @param {string} data.id - The adopter id.
   */
  async execute({ id }) {
    const animalFiles = await this.animalFileRepository.findAllWithProperties({
      animalId: id,
    });
    console.log(animalFiles);

    if (!animalFiles) {
      this.throwError(
        'Fotos do animal não encontradas. Verifique o identificador enviado.'
      );
    }

    return animalFiles;
  }
}
