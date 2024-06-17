import AbstractFactory from '../../../app/abstract/AbstractFactory';
import {
  AnimalRepository,
  AnimalFileRepository,
} from '../../../app/repositories';
import {
  GetDomainByIdStrategy,
  VerifyDomainIdParamStrategy,
} from '../../../app/strategies';
import {
  FormatToAnimalDomainStrategy,
  FindAnimalFilesStrategy,
} from '../strategies';

class GetByIdAnimalFactory extends AbstractFactory {
  constructor() {
    super([
      new VerifyDomainIdParamStrategy(),
      new GetDomainByIdStrategy(AnimalRepository),
      new FindAnimalFilesStrategy(AnimalFileRepository),
      new FormatToAnimalDomainStrategy(),
    ]);
  }
}

export default GetByIdAnimalFactory;
