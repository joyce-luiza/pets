import {
    CreateAdopterFactory,
    GetByIdAdopterFactory,
    CreateAdopterLifestyleAndPreferencesFactory,
} from "../../routes/Adopters/factories";
import { Adopter, AdopterComplement } from "../domains";

export default class AdopterController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
    }

    async create(req, res, next) {
        const adopter = new Adopter(req.body);
        const factory = new CreateAdopterFactory();
        const result = await factory.execute(adopter);
        res.json(result);
    }

    async getById(req, res, next) {
        const adopter = new Adopter({ id: req.params.id });
        const factory = new GetByIdAdopterFactory();
        const result = await factory.execute(adopter);
        res.json(result);
    }

    async createComplement(req, res, next) {
        const { address, preferences, lifestyle } = req.body;

        const adopter = new AdopterComplement({
            address,
            preferences,
            lifestyle,
        });
        const factory = new CreateAdopterLifestyleAndPreferencesFactory();
        const result = await factory.execute(adopter, {}, req.loggedUserInfo);
        res.json(result);
    }
}
