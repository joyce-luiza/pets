import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AnimalColorRepository } from "../../../app/repositories";
import { FindAllStrategy } from "../../../app/strategies";

class FindAllAnimalColorsFactory extends AbstractFactory {
  constructor() {
    super([new FindAllStrategy(AnimalColorRepository)]);
  }
}

export default FindAllAnimalColorsFactory;
