import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AnimalAdapter, Pagination } from "../../../app/domains/adapters";

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
   * @param {Pagination} data - Pagination filter object
   */
  async execute(data, dto) {
    let result = [];

    const animals = await this.animalRepository.findAllToTableView(data);

    if (animals.length) {
      result = animals.map((animal) => new AnimalAdapter(animal));
    }

    if ("data" in animals && animals.data.length) {
      result = {
        ...animals,
        data: animals.data.map((animal) => new AnimalAdapter(animal)),
      };
    }

    return result;
  }
}
