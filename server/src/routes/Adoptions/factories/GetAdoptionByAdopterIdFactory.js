import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    AddressRepository,
    AdoptionRepository,
    AnimalFileRepository,
    AnimalRepository,
    OrganizationRepository,
    ResultRepository,
} from "../../../app/repositories";
import { GetAdoptionByAdopterIdStrategy } from "../strategies";

class GetAdoptionByAdopterIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetAdoptionByAdopterIdStrategy(
                AdoptionRepository,
                AnimalRepository,
                AnimalFileRepository,
                OrganizationRepository,
                AddressRepository,
                ResultRepository
            ),
        ]);
    }
}

export default GetAdoptionByAdopterIdFactory;
