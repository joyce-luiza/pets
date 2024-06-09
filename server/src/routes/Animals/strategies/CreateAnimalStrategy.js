import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Animal } from "../../../app/domains";
import { AnimalAdapter } from "../../../app/domains/adapters";

/**
 * Strategy to find and validate Animal associations fields
 *
 * @extends AbstractStrategy
 */
export default class CreateAnimalStrategy extends AbstractStrategy {
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   * @param {AnimalAdapter} data - Animal adapter object
   */
  async execute(data, dto) {
    const createdAnimal = await this.animalRepository.create(dto);

    if (!createdAnimal) {
      this.throwError("Não foi possível realizar a criação do Animal", 400);
      return;
    }

    return createdAnimal;
  }
}
