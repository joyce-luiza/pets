import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import {
    DeleteLogicallyByOrganizationMemberIdStrategy,
    ValidateSingleActiveOrganizationMemberAdminStrategy,
} from "../strategies";

class DeleteLogicallyByOrganizationMemberIdFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationMemberRepository),
            new ValidateSingleActiveOrganizationMemberAdminStrategy(
                OrganizationMemberRepository
            ),
            new DeleteLogicallyByOrganizationMemberIdStrategy(
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default DeleteLogicallyByOrganizationMemberIdFactory;
