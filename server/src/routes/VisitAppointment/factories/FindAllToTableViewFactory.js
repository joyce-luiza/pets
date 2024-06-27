import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { VisitAppointmentRepository } from "../../../app/repositories";
import { FindAllToTableViewStrategy } from "../strategies";

class FindAllToTableViewFactory extends AbstractFactory {
    constructor() {
        super([new FindAllToTableViewStrategy(VisitAppointmentRepository)]);
    }
}

export default FindAllToTableViewFactory;
