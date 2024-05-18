import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import {
    CreateOrganizationStrategy,
    ValidateCNPJExistenceStrategy,
} from "../strategies";

class CreateOrganizationFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateCNPJExistenceStrategy(OrganizationRepository),
            new CreateOrganizationStrategy(OrganizationRepository),
        ]);
    }
}

export default CreateOrganizationFactory;
