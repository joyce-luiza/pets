import AbstractFactory from '../../../app/abstract/AbstractFactory';
import {
  AnimalRepository,
  AnimalFileRepository,
} from '../../../app/repositories';
import { VerifyDomainIdParamStrategy } from '../../../app/strategies';
import FindAnimalWithFilesByIdStrategy from '../strategies/FindAnimalWithFilesByIdStrategy';

class GetByIdAnimalFactory extends AbstractFactory {
  constructor() {
    super([
      new VerifyDomainIdParamStrategy(),
      // Initialize the strategy with the necessary repositories
      new FindAnimalWithFilesByIdStrategy(
        AnimalRepository,
        AnimalFileRepository
      ),
    ]);
  }
}

export default GetByIdAnimalFactory;
