import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    AnimalRepository,
    ResultRepository,
} from "../../../app/repositories";
import { GetAdoptionByIdStrategy } from "../strategies";

class GetAdoptionByIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdoptionByIdStrategy(
                AdoptionRepository,
                AnimalRepository,
                ResultRepository
            ),
        ]);
    }
}

export default GetAdoptionByIdFactory;
