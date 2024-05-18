import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AddressRepository } from "../../../app/repositories";
import {
    CreateOrganizationAddressStrategy,
    ValidateAddressRequiredFields,
} from "../strategies";

class CreateOrganizationComplementFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateAddressRequiredFields(),
            new CreateOrganizationAddressStrategy(AddressRepository),
        ]);
    }
}

export default CreateOrganizationComplementFactory;
