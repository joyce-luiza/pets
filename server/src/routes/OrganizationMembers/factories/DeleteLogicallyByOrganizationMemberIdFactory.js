import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
    GetDomainByIdStrategy,
    VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import { DeleteLogicallyByOrganizationMemberIdStrategy } from "../strategies";

class DeleteLogicallyByOrganizationMemberIdFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyDomainIdParamStrategy(),
            new GetDomainByIdStrategy(OrganizationMemberRepository),
            new DeleteLogicallyByOrganizationMemberIdStrategy(
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default DeleteLogicallyByOrganizationMemberIdFactory;
