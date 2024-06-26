import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdoptionRepository } from "../../../app/repositories";
import { CreateAdoptionStrategy } from "../strategies";

class CreateAdoptionFactory extends AbstractFactory {
    constructor() {
        super([new CreateAdoptionStrategy(AdoptionRepository)]);
    }
}

export default CreateAdoptionFactory;
