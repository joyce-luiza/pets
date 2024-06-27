import { VisitAppointment } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class VisitAppointmentRepository extends AbstractRepository {
    constructor() {
        super(VisitAppointment);
        this.createVisitAppointment = this.createVisitAppointment.bind(this);
    }

    async createVisitAppointment({
        adopterId,
        organizationId,
        appointmentDateTime,
        notes,
        requesterId,
        approverId,
    }) {
        return await this.create({
            adopterId,
            organizationId,
            appointmentDateTime,
            notes,
            requesterId,
            approverId,
            resultId: await this.getPendingResultId(),
            statusId: await this.getActiveStatusId(),
        });
    }

    async findAllToTableView({ page, size, isPaginated, conditions }) {
        const columnsToFilter = {
            organizationId: "va.organization_id",
            adopterId: "va.adopter_id",
        };

        const conditionsObj = {
            organizationId: {
                value: conditions?.organizationId || null,
                operation: "=",
            },
            adopterId: {
                value: conditions?.adopterId || null,
                operation: "=",
            },
        };

        const { whereCondition, replacements } =
            await this.formatWhereCondition(conditionsObj, columnsToFilter);

        const visitQuery = `
        SELECT
            va.id,
            va.adopter_id AS "adopterId",
            va.organization_id AS "organizationId",
            va.appointment_date_time AS "appointmentDateTime",
            va.notes,
            rs.title AS "result",
            sts.description AS "status",
            va.requester_id AS "requesterId",
            va.approver_id AS "approverId",
            a.first_name AS "adopterFirstName",
            a.last_name AS "adopterLastName",
            a.email AS "adopterEmail",
            o.name AS "organizationName",
            o.email AS "organizationEmail"
        FROM
            "VisitAppointments" va
        LEFT JOIN "Adopters" a ON va.adopter_id = a.id
        LEFT JOIN "Organizations" o ON va.organization_id = o.id
        INNER JOIN "Results" rs ON va.result_id = rs.id
        INNER JOIN "Statuses" sts ON va.status_id = sts.id
        ${whereCondition}
    `;

        const visits = await this.paginateSqlQuery(
            visitQuery,
            page,
            size,
            isPaginated,
            replacements
        );
        return visits;
    }
}

export default new VisitAppointmentRepository();
