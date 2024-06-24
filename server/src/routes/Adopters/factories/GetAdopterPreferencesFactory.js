import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import { GetAdopterPreferencesStrategy } from "../strategies";

class GetAdopterPreferencesFactory extends AbstractFactory {
  constructor() {
    super([new GetAdopterPreferencesStrategy(AdopterRepository)]);
  }
}

export default GetAdopterPreferencesFactory;
