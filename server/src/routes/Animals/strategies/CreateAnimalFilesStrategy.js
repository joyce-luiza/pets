import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AnimalFile } from "../../../app/domains";
import { AnimalAdapter } from "../../../app/domains/adapters";
import { uploadFile } from "../../../app/utils/uploadFile";

/**
 * Strategy to find and validate Animal associations fields
 *
 * @extends AbstractStrategy
 */
export default class CreateAnimalFilesStrategy extends AbstractStrategy {
  constructor(animalFileRepository) {
    super();
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * @param {AnimalAdapter} data - Animal adapter object
   */
  async execute(data, dto) {
    const filesPromises = data.files.map((file) =>
      uploadFile({ file, folder: `/animals/${dto.id}` })
    );

    const resolvedPromises = await Promise.all(filesPromises);

    const animalFiles = [];

    for (const file of resolvedPromises) {
      const animalFile = await this.animalFileRepository.create({
        animalId: dto.id,
        fileUrl: file,
      });

      animalFiles.push(new AnimalFile(animalFile));
    }
  }
}
