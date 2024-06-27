import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AdopterRepository,
    AddressRepository,
    LifestyleRepository,
} from "../../../app/repositories";
import { GetAdopterAllInformationStrategy } from "../strategies";

class GetAdopterAllInformationFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdopterAllInformationStrategy(
                AdopterRepository,
                AddressRepository,
                LifestyleRepository
            ),
        ]);
    }
}

export default GetAdopterAllInformationFactory;
