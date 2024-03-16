import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AnimalAgeGroupRepository } from "../../../app/repositories";
import { FindAllStrategy } from "../../../app/strategies";

class FindAllAnimalAgeGroupsFactory extends AbstractFactory {
  constructor() {
    super([new FindAllStrategy(AnimalAgeGroupRepository)]);
  }
}

export default FindAllAnimalAgeGroupsFactory;
