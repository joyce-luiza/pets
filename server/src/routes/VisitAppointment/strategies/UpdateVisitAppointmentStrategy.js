import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    VisitAppointmentRepository,
    ResultRepository,
} from "../../../app/repositories";
import { VisitAppointment } from "../../../app/domains";

/**
 * Strategy to update the status of a Visit Appointment
 *
 * @extends AbstractStrategy
 */
export default class UpdateVisitAppointmentStrategy extends AbstractStrategy {
    /**
     * @param {VisitAppointmentRepository} visitAppointmentRepository
     * @param {ResultRepository} resultRepository
     */
    constructor(visitAppointmentRepository, resultRepository) {
        super();
        this.visitAppointmentRepository = visitAppointmentRepository;
        this.resultRepository = resultRepository;
    }

    /**
     * @param {Object} data - Data to update visit appointment status
     * @param {string} data.id - ID of the visit appointment to update
     * @param {string} data.result - Result of the visit appointment
     * @param {string} data.approverId - ID of the user approving the status change
     */
    async execute(data, dto, loggedUserInfo) {
        const { id } = data;

        // Find the existing visit appointment
        const visit = await this.visitAppointmentRepository.findById(id);
        if (!visit) {
            this.throwError("Visita não encontrada.", 404);
        }

        // Check if the logged in user is the approver
        if (
            visit.approverId !== loggedUserInfo.userId &&
            visit.approverId !== loggedUserInfo.organizationId
        ) {
            this.throwError(
                "Você não tem autorização para atualizar essa visita.",
                403
            );
        }

        const resultData = await this.resultRepository.findByProp(
            "title",
            data.result
        );

        // Update the result of the visit appointment
        await this.visitAppointmentRepository.update(
            {
                resultId: resultData.id,
            },
            {
                id: data.id,
            }
        );

        const updatedVisit = await this.visitAppointmentRepository.findById(id);

        const result = new VisitAppointment(updatedVisit);
        return result;
    }
}
