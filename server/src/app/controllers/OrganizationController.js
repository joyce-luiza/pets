import { CreateOrganizationFactory } from "../../routes/Organizations/factories";
import { Organization } from "../../database/models";
import GetByIdOrganizationFactory from "../../routes/Organizations/factories/GetByIdOrganizationFactory";

export default class OrganizationController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
    }

    async create(req, res, next) {
        const org = new Organization(req.body);
        const factory = new CreateOrganizationFactory();
        const result = await factory.execute(org);
        res.json(result);
    }

    async getById(req, res, next) {
        const org = new Organization({ id: req.params.id });
        const factory = new GetByIdOrganizationFactory();
        const result = await factory.execute(org);
        res.json(result);
    }
}
