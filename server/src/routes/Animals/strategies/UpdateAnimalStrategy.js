import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import {
  AnimalFileRepository,
  AnimalRepository,
} from '../../../app/repositories';
import { Animal, AnimalFile } from '../../../app/domains';
import sanitize from '../../../app/utils/sanitize';
import { uploadFile } from '../../../app/utils/uploadFile';
import dayjs from 'dayjs'; // Importe dayjs para formatação de data

/**
 * Strategy to update an Animal
 *
 * @extends AbstractStrategy
 */
export default class UpdateAnimalStrategy extends AbstractStrategy {
  constructor(animalRepository, animalFileRepository) {
    super();
    this.animalRepository = animalRepository;
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * @param {Animal} data - Animal domain object
   * @param {Object} dto - Data transfer object with update information
   */
  async execute(data, dto) {
    const formattedBirthDate = dto.birthDate
      ? dayjs(dto.birthDate).format('YYYY-MM-DD')
      : null;

    const updated = await this.animalRepository.update(
      { ...dto, birthDate: formattedBirthDate },
      { id: data.id }
    );

    if (!updated) {
      this.throwError('Erro ao atualizar as informações do animal.');
      return;
    }

    const filesPromises = data.files.map((file) =>
      uploadFile({ file, folder: `/animals/${data.id}` })
    );

    const resolvedPromises = await Promise.all(filesPromises);

    const animalFiles = [];

    for (const file of resolvedPromises) {
      const animalFile = await this.animalFileRepository.create({
        animalId: data.id,
        fileUrl: file,
      });

      animalFiles.push(new AnimalFile(animalFile));
    }

    const animal = await this.animalRepository.findById(data.id);

    const result = new Animal(animal);
    return result;
  }
}
