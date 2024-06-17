import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationInviteRepository } from "../../../app/repositories";
import { VerifyOrganizationInviteEmailStrategy } from "../strategies";

class VerifyOrganizationInviteEmailFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyOrganizationInviteEmailStrategy(
                OrganizationInviteRepository
            ),
        ]);
    }
}

export default VerifyOrganizationInviteEmailFactory;
