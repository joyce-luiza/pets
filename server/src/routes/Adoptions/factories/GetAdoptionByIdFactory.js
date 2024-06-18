import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdoptionRepository,
    ResultRepository,
} from "../../../app/repositories";
import { GetAdoptionByIdStrategy } from "../strategies";

class GetAdoptionByIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdoptionByIdStrategy(AdoptionRepository, ResultRepository),
        ]);
    }
}

export default GetAdoptionByIdFactory;
