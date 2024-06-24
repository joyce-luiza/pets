import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { AnimalAdapter, Pagination } from '../../../app/domains/adapters';

export default class FindAllToTableViewStrategy extends AbstractStrategy {
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  async execute(data, dto) {
    let result = [];

    const { ...paginationData } = data;

    const animals = await this.animalRepository.findAllToTableView({
      ...paginationData,
      search: paginationData.conditions.search,
      typeFilter: paginationData.conditions.typeFilter,
      sexFilter: paginationData.conditions.sexFilter,
      sizeFilter: paginationData.conditions.sizeFilter,
      ageFilter: paginationData.conditions.ageFilter,
      statusFilter: paginationData.conditions.statusFilter,
    });

    if (animals.length) {
      result = animals.map((animal) => new AnimalAdapter(animal));
    }

    if ('data' in animals && animals.data.length) {
      result = {
        ...animals,
        data: animals.data.map((animal) => new AnimalAdapter(animal)),
      };
    }

    return result;
  }
}
