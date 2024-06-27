import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    VisitAppointmentRepository,
    ResultRepository,
} from "../../../app/repositories";
import { UpdateVisitAppointmentStrategy } from "../strategies";

class UpdateVisitAppointmentFactory extends AbstractFactory {
    constructor() {
        super([
            new UpdateVisitAppointmentStrategy(
                VisitAppointmentRepository,
                ResultRepository
            ),
        ]);
    }
}

export default UpdateVisitAppointmentFactory;
