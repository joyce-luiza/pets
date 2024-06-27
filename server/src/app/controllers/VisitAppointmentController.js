import { VisitAppointment, Pagination } from "../domains";
import {
    CreateVisitAppointmentFactory,
    UpdateVisitAppointmentFactory,
    FindAllToTableViewFactory,
} from "../../routes/VisitAppointment/factories";
import { VisitAppointmentAdapter } from "../domains/adapters";

export default class VisitAppointmentController {
    constructor() {
        this.create = this.create.bind(this);
    }

    async create(req, res, next) {
        const visit = new VisitAppointment(req.body);
        const factory = new CreateVisitAppointmentFactory();
        const result = await factory.execute(visit, req.loggedUserInfo);
        res.json(result);
    }

    async update(req, res, next) {
        const visit = new VisitAppointmentAdapter(req.body);
        const factory = new UpdateVisitAppointmentFactory();
        const result = await factory.execute(visit, req.loggedUserInfo);
        res.json(result);
    }

    async findAllToTableView(req, res, next) {
        const domain = new Pagination(req.query);
        const factory = new FindAllToTableViewFactory();
        const result = await factory.execute(domain, req.loggedUserInfo);
        res.json(result);
    }
}
