import AbstractFactory from '../../../app/abstract/AbstractFactory';
import { AnimalRepository } from '../../../app/repositories';
import { FindAnimalAndUpdateProfileImageStrategy } from '../strategies';

class UpdateProfileImageAnimalFactory extends AbstractFactory {
  constructor() {
    super([new FindAnimalAndUpdateProfileImageStrategy(AnimalRepository)]);
  }
}

export default UpdateProfileImageAnimalFactory;
