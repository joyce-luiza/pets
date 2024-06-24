import AbstractFactory from '../../../app/abstract/AbstractFactory';
import {
  AnimalAgeGroupRepository,
  AnimalColorRepository,
  AnimalFileRepository,
  AnimalRepository,
  AnimalSizeRepository,
  AnimalTypeRepository,
  StatusesRepository,
} from '../../../app/repositories';
import {
  ValidateAnimalRequiredFieldsStrategy,
  UpdateAnimalStrategy,
  GetAnimalAssociationsStrategy,
} from '../strategies';

class UpdateAnimalFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateAnimalRequiredFieldsStrategy(),
      new GetAnimalAssociationsStrategy(
        AnimalAgeGroupRepository,
        AnimalColorRepository,
        AnimalSizeRepository,
        AnimalTypeRepository,
        StatusesRepository
      ),
      new UpdateAnimalStrategy(AnimalRepository, AnimalFileRepository),
    ]);
  }
}

export default UpdateAnimalFactory;
