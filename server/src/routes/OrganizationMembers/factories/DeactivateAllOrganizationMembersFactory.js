import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { DeactivateAllOrganizationMembersStrategy } from "../strategies";
class DeactivateAllOrganizationMembersFactory extends AbstractFactory {
    constructor() {
        super([
            new DeactivateAllOrganizationMembersStrategy(
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default DeactivateAllOrganizationMembersFactory;
