import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AnimalRepository } from "../../../app/repositories";
import { FindAllToTableViewStrategy } from "../strategies";

class FindAllToTableViewFactory extends AbstractFactory {
  constructor() {
    super([new FindAllToTableViewStrategy(AnimalRepository)]);
  }
}

export default FindAllToTableViewFactory;
