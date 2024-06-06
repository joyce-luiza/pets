import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { VerifyOrganizationMemberAdminRoleStrategy } from "../strategies";

class VerifyOrganizationMemberAdminRoleFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyOrganizationMemberAdminRoleStrategy(
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default VerifyOrganizationMemberAdminRoleFactory;
