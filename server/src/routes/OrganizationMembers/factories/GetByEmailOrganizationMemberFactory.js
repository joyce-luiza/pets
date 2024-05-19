import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { ValidateEmailExistenceStrategy } from "../strategies";

class GetByEmailOrganizationMemberFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateEmailExistenceStrategy(OrganizationMemberRepository),
        ]);
    }
}

export default GetByEmailOrganizationMemberFactory;
