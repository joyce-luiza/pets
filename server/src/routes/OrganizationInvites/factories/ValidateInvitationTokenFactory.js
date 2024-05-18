import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationInviteRepository } from "../../../app/repositories";
import {
    ValidateInviteTokenExistenceStrategy,
    ValidateInviteTokenStrategy,
} from "../strategies";

class ValidateInvitationTokenFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateInviteTokenExistenceStrategy(
                OrganizationInviteRepository
            ),
            new ValidateInviteTokenStrategy(OrganizationInviteRepository),
        ]);
    }
}

export default ValidateInvitationTokenFactory;
