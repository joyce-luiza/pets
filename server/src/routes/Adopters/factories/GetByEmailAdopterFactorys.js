import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import { ValidateEmailExistenceStrategy } from "../strategies";

class GetByEmailAdopterFactory extends AbstractFactory {
    constructor() {
        super([new ValidateEmailExistenceStrategy(AdopterRepository)]);
    }
}

export default GetByEmailAdopterFactory;
