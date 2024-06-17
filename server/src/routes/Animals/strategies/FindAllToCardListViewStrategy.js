import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AnimalCardListAdapter } from "../../../app/domains/adapters";
import { Pagination } from "../../../app/domains";
import {
  AnimalRepository,
  AnimalFileRepository,
} from "../../../app/repositories";

/**
 * Strategy to find and validate Animal associations fields
 *
 * @extends AbstractStrategy
 */
export default class FindAllToCardListViewStrategy extends AbstractStrategy {
  /**
   *
   * @param {AnimalRepository} animalRepository
   * @param {AnimalFileRepository} animalFileRepository
   */
  constructor(animalRepository, animalFileRepository) {
    super();
    this.animalRepository = animalRepository;
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * @param {Pagination} data - Pagination filter object
   */
  async execute(data) {
    let result = [];

    const animals = await this.animalRepository.findAllToCardListView(data);

    if (animals.length) {
      result = animals.map((animal) => new AnimalCardListAdapter(animal));
    }

    if ("data" in animals && animals.data.length) {
      const promises = animals.data.map(async (animal) => {
        const files = await this.animalFileRepository.findAllByProp(
          "animalId",
          animal.id
        );
        return new AnimalCardListAdapter({
          ...animal,
          files,
        });
      });

      const data = await Promise.all(promises);

      result = {
        ...animals,
        data,
      };
    }

    return result;
  }
}
