import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AnimalSizeRepository } from "../../../app/repositories";
import { FindAllStrategy } from "../../../app/strategies";

class FindAllAnimalSizesFactory extends AbstractFactory {
  constructor() {
    super([new FindAllStrategy(AnimalSizeRepository)]);
  }
}

export default FindAllAnimalSizesFactory;
