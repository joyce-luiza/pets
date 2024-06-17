import AbstractFactory from '../../../app/abstract/AbstractFactory';
import { AnimalRepository } from '../../../app/repositories';
import {
  GetDomainByIdStrategy,
  VerifyDomainIdParamStrategy,
} from '../../../app/strategies';
import { DeleteLogicallyByAnimalIdStrategy } from '../strategies';

class DeleteLogicallyByAnimalIdFactory extends AbstractFactory {
  constructor() {
    super([
      new VerifyDomainIdParamStrategy(),
      new GetDomainByIdStrategy(AnimalRepository),
      new DeleteLogicallyByAnimalIdStrategy(AnimalRepository),
    ]);
  }
}

export default DeleteLogicallyByAnimalIdFactory;
