import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import { FindAdopterAndUpdateProfileImageStrategy } from "../strategies";

class UpdateProfileImageAdopterFactory extends AbstractFactory {
  constructor() {
    super([new FindAdopterAndUpdateProfileImageStrategy(AdopterRepository)]);
  }
}

export default UpdateProfileImageAdopterFactory;
