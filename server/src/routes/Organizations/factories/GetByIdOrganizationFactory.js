import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import FormatToOrganizationDomainStrategy from "../strategies/FormatToOrganizationDomainStrategy";

class GetByIdOrganizationFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationRepository),
            new FormatToOrganizationDomainStrategy(),
        ]);
    }
}

export default GetByIdOrganizationFactory;
