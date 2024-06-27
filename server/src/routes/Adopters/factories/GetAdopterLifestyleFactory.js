import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import { GetAdopterLifestyleStrategy } from "../strategies";

class GetAdopterLifestyleFactory extends AbstractFactory {
  constructor() {
    super([new GetAdopterLifestyleStrategy(AdopterRepository)]);
  }
}

export default GetAdopterLifestyleFactory;
