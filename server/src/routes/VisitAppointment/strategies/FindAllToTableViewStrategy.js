import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    VisitAppointmentAdapter,
    Pagination,
} from "../../../app/domains/adapters";

/**
 * Strategy to list all visit appointments in a table
 *
 * @extends AbstractStrategy
 */
export default class FindAllToTableViewStrategy extends AbstractStrategy {
    constructor(visitAppointmentRepository) {
        super();
        this.visitAppointmentRepository = visitAppointmentRepository;
    }

    /**
     * @param {Pagination} data - Pagination filter object
     */
    async execute(data, dto, loggedUserInfo) {
        const { type } = loggedUserInfo;

        const conditions = {
            adopterId: type === "ADOPTER" ? loggedUserInfo.userId : null,
            organizationId:
                type === "ORGANIZATION" ? loggedUserInfo.organizationId : null,
        };

        let result = [];

        const visits = await this.visitAppointmentRepository.findAllToTableView(
            { ...data, conditions }
        );

        if (visits.length) {
            result = visits.map((visit) => new VisitAppointmentAdapter(visit));
        }

        if ("data" in visits && visits.data.length) {
            result = {
                ...visits,
                data: visits.data.map(
                    (visit) => new VisitAppointmentAdapter(visit)
                ),
            };
        }

        console.log(visits);

        return result;
    }
}
