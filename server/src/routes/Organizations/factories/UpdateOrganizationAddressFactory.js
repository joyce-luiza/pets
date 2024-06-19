import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AddressRepository } from "../../../app/repositories";
import { UpdateOrganizationAddressStrategy } from "../strategies";

class UpdateOrganizationAddressFactory extends AbstractFactory {
    constructor() {
        super([new UpdateOrganizationAddressStrategy(AddressRepository)]);
    }
}

export default UpdateOrganizationAddressFactory;
