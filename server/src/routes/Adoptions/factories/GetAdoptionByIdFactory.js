import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    AnimalRepository,
    AdopterRepository,
    ResultRepository,
} from "../../../app/repositories";
import { GetAdoptionByIdStrategy } from "../strategies";

class GetAdoptionByIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdoptionByIdStrategy(
                AdoptionRepository,
                AnimalRepository,
                AdopterRepository,
                ResultRepository
            ),
        ]);
    }
}

export default GetAdoptionByIdFactory;
