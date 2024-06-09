import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AnimalWithFilesResult } from "../../../app/domains/result";
import { AnimalAdapter } from "../../../app/domains/adapters";

/**
 * Strategy to find and validate Animal associations fields
 *
 * @extends AbstractStrategy
 */
export default class CreateAnimalFilesStrategy extends AbstractStrategy {
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   * @param {AnimalAdapter} data - Animal adapter object
   */
  async execute(data, dto) {
    const createdAnimal = await this.animalRepository.getWithFilesById({
      id: dto.id,
    });

    if (!createdAnimal) {
      this.throwError(
        "Não foi possível recuperar as informações do animal.",
        400
      );
    }

    return new AnimalWithFilesResult(createdAnimal);
  }
}
