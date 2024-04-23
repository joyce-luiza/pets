import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import {
  ValidateAdopterAgeStrategy,
  ValidateEmailExistenceStrategy,
  UpdateAdopterStrategy,
} from "../strategies";

class UpdateAdopterFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateAdopterAgeStrategy(),
      new ValidateEmailExistenceStrategy(AdopterRepository),
      new UpdateAdopterStrategy(AdopterRepository),
    ]);
  }
}

export default UpdateAdopterFactory;
