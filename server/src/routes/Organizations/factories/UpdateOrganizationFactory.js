import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import {
    UpdateOrganizationStrategy,
    ValidateCNPJExistenceStrategy,
} from "../strategies";

class UpdateOrganizationFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateCNPJExistenceStrategy(OrganizationRepository),
            new UpdateOrganizationStrategy(OrganizationRepository),
        ]);
    }
}

export default UpdateOrganizationFactory;
