import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationInviteRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import { FormatToOrganizationInviteDomainStrategy } from "../strategies";

class GetByIdOrganizationInviteFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationInviteRepository),
            new FormatToOrganizationInviteDomainStrategy(
                OrganizationInviteRepository
            ),
        ]);
    }
}

export default GetByIdOrganizationInviteFactory;
