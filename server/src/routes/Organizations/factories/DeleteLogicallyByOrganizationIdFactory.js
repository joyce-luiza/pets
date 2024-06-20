import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import { DeleteLogicallyByOrganizationIdStrategy } from "../strategies";

class DeleteLogicallyByOrganizationIdFactory extends AbstractFactory {
    constructor() {
        super([
            new DeleteLogicallyByOrganizationIdStrategy(OrganizationRepository),
        ]);
    }
}

export default DeleteLogicallyByOrganizationIdFactory;
