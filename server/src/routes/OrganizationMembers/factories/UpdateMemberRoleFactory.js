import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import {
    UpdateMemberRoleStrategy,
    VerifyOrganizationMemberOrganizationIdStrategy,
} from "../strategies";

class UpdateMemberRoleFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationMemberRepository),
            new VerifyOrganizationMemberOrganizationIdStrategy(
                OrganizationMemberRepository
            ),
            new UpdateMemberRoleStrategy(OrganizationMemberRepository),
        ]);
    }
}

export default UpdateMemberRoleFactory;
