import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AddressRepository } from "../../../app/repositories";
import {
    GetOrganizationAddressStrategy,
    FormatToAddressDomainStrategy,
} from "../strategies";
class GetOrganizationComplementFactory extends AbstractFactory {
    constructor() {
        super([
            new GetOrganizationAddressStrategy(AddressRepository),
            new FormatToAddressDomainStrategy(),
        ]);
    }
}

export default GetOrganizationComplementFactory;
