import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { VisitAppointmentRepository } from "../../../app/repositories";
import { VisitAppointment } from "../../../app/domains";

/**
 * Strategy to create an Visit Appointment
 *
 * @extends AbstractStrategy
 */
export default class CreateVisitAppointmentStrategy extends AbstractStrategy {
    /**
     * @param {VisitAppointmentRepository} visitAppointmentRepository
     */
    constructor(visitAppointmentRepository) {
        super();
        this.visitAppointmentRepository = visitAppointmentRepository;
    }

    /**
     * @param {VisitAppointment} data - Visit Appointment domain object
     */
    async execute(data, dto, loggedUserInfo) {
        const { type } = loggedUserInfo;

        let requesterId;
        let approverId;
        let adopterId;
        let organizationId;

        if (type === "ADOPTER") {
            requesterId = loggedUserInfo.userId;
            adopterId = requesterId;
            approverId = data.organizationId;
            organizationId = approverId;
        } else {
            requesterId = loggedUserInfo.organizationId;
            organizationId = requesterId;
            approverId = data.adopterId;
            adopterId = approverId;
        }

        const visit =
            await this.visitAppointmentRepository.createVisitAppointment({
                ...data,
                adopterId: adopterId,
                organizationId: organizationId,
                requesterId: requesterId,
                approverId: approverId,
            });

        if (!visit) {
            this.throwError("Erro ao marcar a visita");
        }
        const result = new VisitAppointment(visit);
        return result;
    }
}
