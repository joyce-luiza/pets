import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    OrganizationInviteRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";
import {
    CreateOrganizationInviteStrategy,
    ValidateEmailExistenceStrategy,
} from "../strategies";

class CreateOrganizationInviteFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateEmailExistenceStrategy(OrganizationMemberRepository),
            new CreateOrganizationInviteStrategy(OrganizationInviteRepository),
        ]);
    }
}

export default CreateOrganizationInviteFactory;
