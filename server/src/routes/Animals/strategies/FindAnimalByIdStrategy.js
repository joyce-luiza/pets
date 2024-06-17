import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { LoggedUser } from '../../../app/domains';
/**
 * Strategy to search for an active animal by id.
 *
 * @extends AbstractStrategy
 */
export default class FindAnimalByIdStrategy extends AbstractStrategy {
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   * Find animal by id
   *
   * @param {AdopterComplement} data - The data object containing id property.
   * @param {string} data.id - The animal id.
   * @param {LoggedUser} loggedUserInfo - The animal id.
   * @throws {Error} Throws an error if the animal doesn't exists.
   */
  async execute({ id }, _, loggedUserInfo) {
    const animal = await this.animalRepository.findActiveAnimalById(
      id ? id : loggedUserInfo.userId
    );

    if (!animal) {
      this.throwError(
        'Animal não encontrado. Verifique o identificador enviado.'
      );
    }

    return animal;
  }
}
