import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import { ValidateCNPJExistenceStrategy } from "../strategies";

class GetByCNPJOrganizationFactory extends AbstractFactory {
    constructor() {
        super([new ValidateCNPJExistenceStrategy(OrganizationRepository)]);
    }
}

export default GetByCNPJOrganizationFactory;
