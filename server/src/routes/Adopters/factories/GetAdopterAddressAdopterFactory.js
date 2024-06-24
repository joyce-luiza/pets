import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AddressRepository } from "../../../app/repositories";
import { FindLoggedAdopterAddressStrategy } from "../strategies";

class GetAdopterAddressAdopterFactory extends AbstractFactory {
  constructor() {
    super([new FindLoggedAdopterAddressStrategy(AddressRepository)]);
  }
}

export default GetAdopterAddressAdopterFactory;
