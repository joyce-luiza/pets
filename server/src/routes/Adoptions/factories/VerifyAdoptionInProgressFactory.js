import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    AnimalRepository,
    AdopterRepository,
} from "../../../app/repositories";
import { VerifyAdoptionInProgressStrategy } from "../strategies";

class VerifyAdoptionInProgressFactory extends AbstractFactory {
    constructor() {
        super([
            new VerifyAdoptionInProgressStrategy(
                AdoptionRepository,
                AnimalRepository,
                AdopterRepository
            ),
        ]);
    }
}

export default VerifyAdoptionInProgressFactory;
