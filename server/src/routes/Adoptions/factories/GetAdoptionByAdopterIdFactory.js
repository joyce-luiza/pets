import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    AnimalFileRepository,
    AnimalRepository,
} from "../../../app/repositories";
import { GetAdoptionByAdopterIdStrategy } from "../strategies";

class GetAdoptionByAdopterIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdoptionByAdopterIdStrategy(
                AdoptionRepository,
                AnimalRepository,
                AnimalFileRepository
            ),
        ]);
    }
}

export default GetAdoptionByAdopterIdFactory;
