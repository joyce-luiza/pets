import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationInviteRepository } from "../../../app/repositories";
import { DeactivateOrganizationInviteByEmailStrategy } from "../strategies";

class DeactivateOrganizationInviteByEmailFactory extends AbstractFactory {
    constructor() {
        super([
            new DeactivateOrganizationInviteByEmailStrategy(
                OrganizationInviteRepository
            ),
        ]);
    }
}

export default DeactivateOrganizationInviteByEmailFactory;
