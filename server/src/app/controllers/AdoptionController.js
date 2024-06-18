import {
    CreateAdoptionFactory,
    FindAllToTableViewFactory,
    GetAdoptionByAdopterIdFactory,
    GetAdoptionByIdFactory,
    RejectOtherAdoptionsFactory,
    UpdateAdoptionFactory,
} from "../../routes/Adoptions/factories";
import { Adopter, Adoption, Pagination } from "../domains";

export default class AdoptionController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getByAdopterId = this.getByAdopterId.bind(this);
        this.findAllToTableView = this.findAllToTableView.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req, res, next) {
        const adoption = new Adoption({
            ...req.body,
            adopterId: req.loggedUserInfo.userId,
        });
        const factory = new CreateAdoptionFactory();
        const result = await factory.execute(adoption);

        const rejectAdoptions = new RejectOtherAdoptionsFactory();

        res.json(result);
    }

    async getById(req, res, next) {
        const adoption = new Adoption({ id: req.params.id });
        const factory = new GetAdoptionByIdFactory();
        const result = await factory.execute(adoption);
        res.json(result);
    }

    async getByAdopterId(req, res, next) {
        const adopter = new Adopter({ id: req.params.id });
        const factory = new GetAdoptionByAdopterIdFactory();
        const result = await factory.execute(adopter);
        res.json(result);
    }

    async findAllToTableView(req, res, next) {
        const domain = new Pagination(req.query);
        const factory = new FindAllToTableViewFactory();
        const result = await factory.execute(domain, req.loggedUserInfo);
        res.json(result);
    }

    async update(req, res, next) {
        const adoption = {
            ...req.body,
        };
        const factory = new UpdateAdoptionFactory();
        const result = await factory.execute(adoption);
        res.json(result);
    }
}
