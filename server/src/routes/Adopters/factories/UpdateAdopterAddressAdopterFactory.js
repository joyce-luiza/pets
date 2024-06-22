import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AddressRepository } from "../../../app/repositories";
import {
  ValidateRequiredFieldsToUpdateAddress,
  CreateOrUpdateAdopterAddressStrategy,
} from "../strategies";

class UpdateAdopterAddressAdopterFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateRequiredFieldsToUpdateAddress(),
      new CreateOrUpdateAdopterAddressStrategy(AddressRepository),
    ]);
  }
}

export default UpdateAdopterAddressAdopterFactory;
