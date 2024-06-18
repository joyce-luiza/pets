import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    ResultRepository,
} from "../../../app/repositories";
import { RejectOtherAdoptionsStrategy } from "../strategies";

class RejectOtherAdoptionsFactory extends AbstractFactory {
    constructor() {
        super([
            new RejectOtherAdoptionsStrategy(
                AdoptionRepository,
                ResultRepository
            ),
        ]);
    }
}

export default RejectOtherAdoptionsFactory;
