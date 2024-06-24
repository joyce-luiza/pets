import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
  AnimalCardListAdapter,
  Pagination,
} from "../../../app/domains/adapters";

/**
 * Strategy to find all animals available to adoption
 *
 * @extends AbstractStrategy
 */
export default class FindAllCardListViewStrategy extends AbstractStrategy {
  constructor(animalRepository, animalFileRepository) {
    super();
    this.animalRepository = animalRepository;
    this.animalFileRepository = animalFileRepository;
  }

  /**
   * @param {Pagination} data - Pagination filter object
   */
  async execute(data, dto) {
    let result = [];

    const animals = await this.animalRepository.findAllCardListView(data);

    if (animals.length) {
      result = animals.map((animal) => new AnimalCardListAdapter(animal));
    }

    if ("data" in animals && animals.data.length) {
      const animalDataPromises = animals.data.map(async (animal) => {
        const files = await this.animalFileRepository.findAllByProp(
          "animalId",
          animal.id
        );
        return new AnimalCardListAdapter({ ...animal, files });
      });

      result = {
        ...animals,
        data: await Promise.all(animalDataPromises),
      };
    }

    return result;
  }
}
