import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdoptionRepository } from "../../../app/repositories";
import { FindAllToTableViewStrategy } from "../strategies";

class FindAllToTableViewFactory extends AbstractFactory {
    constructor() {
        super([new FindAllToTableViewStrategy(AdoptionRepository)]);
    }
}

export default FindAllToTableViewFactory;
