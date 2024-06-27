import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    ResultRepository,
    AnimalRepository,
    AdopterRepository,
    OrganizationRepository,
} from "../../../app/repositories";
import {
    UpdateAdoptionStrategy,
    RejectOtherAdoptionsStrategy,
    SendRejectAdoptionEmailStrategy,
    GetAdoptionAssociationsStrategy,
    SendApprovedAdoptionEmailStrategy,
    VerifyAdoptionAnimalStrategy,
} from "../strategies";

class UpdateAdoptionFactory extends AbstractFactory {
    constructor() {
        super([
            new UpdateAdoptionStrategy(AdoptionRepository, ResultRepository),
            new VerifyAdoptionAnimalStrategy(
                AdopterRepository,
                ResultRepository,
                AnimalRepository
            ),
            new GetAdoptionAssociationsStrategy(
                AdoptionRepository,
                ResultRepository,
                AdopterRepository,
                AnimalRepository,
                OrganizationRepository
            ),
            new RejectOtherAdoptionsStrategy(
                AdoptionRepository,
                ResultRepository
            ),
            new SendApprovedAdoptionEmailStrategy(),
            new SendRejectAdoptionEmailStrategy(
                AdoptionRepository,
                AdopterRepository
            ),
        ]);
    }
}

export default UpdateAdoptionFactory;
