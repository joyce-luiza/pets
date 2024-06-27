import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { LifestyleRepository } from "../../../app/repositories";
import { CreateOrUpdateAdopterLifestyleStrategy } from "../strategies";

class UpdateAdopterLifestyleFactory extends AbstractFactory {
  constructor() {
    super([new CreateOrUpdateAdopterLifestyleStrategy(LifestyleRepository)]);
  }
}

export default UpdateAdopterLifestyleFactory;
