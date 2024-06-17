import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Animal } from '../../../app/domains';
import { AnimalRepository } from '../../../app/repositories';
import { uploadFile } from '../../../app/utils/uploadFile';

/**
 *
 *
 * @extends AbstractStrategy
 */
export default class FindAnimalAndUpdateProfileImageStrategy extends AbstractStrategy {
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
  async execute(file, dto, loggedUserInfo) {
    const animal = await this.animalRepository.findById(loggedUserInfo.userId);

    if (!animal) {
      this.throwError('Não foi possível recuperar os dados do animal.');
      return;
    }

    let imageUrl = '';

    if (animal.imageUrl) {
      imageUrl = await uploadFile({
        file,
        folder: 'animals',
        previousFilePath: animal.imageUrl,
      });
    } else {
      imageUrl = await uploadFile({ file, folder: 'animals' });
    }

    if (!imageUrl) {
      this.throwError('Não foi possível realizar o upload da imagem.');
      return;
    }

    await this.animalRepository.update(
      {
        id: loggedUserInfo.userId,
        imageUrl,
      },
      {
        id: loggedUserInfo.userId,
      }
    );
    return imageUrl;
  }
}
