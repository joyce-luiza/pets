import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import { FormatToOrganizationMemberDomainStrategy } from "../strategies";

class GetByIdOrganizationMemberFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationMemberRepository),
            new FormatToOrganizationMemberDomainStrategy(),
        ]);
    }
}

export default GetByIdOrganizationMemberFactory;
