import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AnimalTypeRepository } from "../../../app/repositories";
import { FindAllStrategy } from "../../../app/strategies";

class FindAllAnimalTypesFactory extends AbstractFactory {
  constructor() {
    super([new FindAllStrategy(AnimalTypeRepository)]);
  }
}

export default FindAllAnimalTypesFactory;
