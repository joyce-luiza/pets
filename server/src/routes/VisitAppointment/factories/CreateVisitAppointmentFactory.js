import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
    VisitAppointmentRepository,
    AnimalRepository,
    OrganizationMemberRepository,
    AdopterRepository,
} from "../../../app/repositories";
import {
    CreateVisitAppointmentStrategy,
    SendNewVisitAppointmentEmailStrategy,
} from "../strategies";

class CreateVisitAppointmentFactory extends AbstractFactory {
    constructor() {
        super([
            new CreateVisitAppointmentStrategy(VisitAppointmentRepository),
            new SendNewVisitAppointmentEmailStrategy(
                AnimalRepository,
                OrganizationMemberRepository,
                AdopterRepository
            ),
        ]);
    }
}

export default CreateVisitAppointmentFactory;
