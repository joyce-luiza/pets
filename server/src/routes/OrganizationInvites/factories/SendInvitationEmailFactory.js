import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    OrganizationMemberRepository,
    OrganizationRepository,
} from "../../../app/repositories";
import { SendInvitationEmailStrategy } from "../strategies";

class SendInvitationEmailFactory extends AbstractFactory {
    constructor() {
        super([
            new SendInvitationEmailStrategy(
                OrganizationRepository,
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default SendInvitationEmailFactory;
