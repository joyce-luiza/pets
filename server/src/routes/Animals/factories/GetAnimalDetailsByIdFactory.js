import AbstractFactory from '../../../app/abstract/AbstractFactory';
import {
  AnimalRepository,
  OrganizationRepository,
  AddressRepository,
} from '../../../app/repositories';
import { GetAnimalDetailsByIdStrategy } from '../strategies';

class GetAnimalDetailsByIdFactory extends AbstractFactory {
  constructor() {
    super([
      new GetAnimalDetailsByIdStrategy(
        AnimalRepository,
        OrganizationRepository,
        AddressRepository
      ),
    ]);
  }
}

export default GetAnimalDetailsByIdFactory;
