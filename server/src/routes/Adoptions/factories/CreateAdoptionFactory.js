import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    AnimalRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";
import {
    CreateAdoptionStrategy,
    SendNewAdoptionEmailStrategy,
} from "../strategies";

class CreateAdoptionFactory extends AbstractFactory {
    constructor() {
        super([
            new CreateAdoptionStrategy(AdoptionRepository),
            new SendNewAdoptionEmailStrategy(
                AdoptionRepository,
                AnimalRepository,
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default CreateAdoptionFactory;
