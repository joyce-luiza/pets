import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { UpdateOrganizationMemberStrategy } from "../strategies";

class UpdateOrganizationMemberFactory extends AbstractFactory {
    constructor() {
        super([
            new UpdateOrganizationMemberStrategy(OrganizationMemberRepository),
        ]);
    }
}

export default UpdateOrganizationMemberFactory;
