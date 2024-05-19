import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
    ValidateOrganizationMemberRequiredFieldsStrategy,
    CreateOrganizationMemberStrategy,
    ValidateEmailExistenceStrategy,
} from "../strategies";

class CreateOrganizationMemberFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateOrganizationMemberRequiredFieldsStrategy(),
            new ValidateEmailExistenceStrategy(OrganizationMemberRepository),
            new CreateOrganizationMemberStrategy(OrganizationMemberRepository),
        ]);
    }
}

export default CreateOrganizationMemberFactory;
