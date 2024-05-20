import {
    CreateAdopterFactory,
    GetByIdAdopterFactory,
    CreateAdopterLifestyleAndPreferencesFactory,
    DeleteLogicallyByAdopterIdFactory,
    UpdateAdopterFactory,
    UpdateProfileImageAdopterFactory,
} from "../../routes/Adopters/factories";
import { Adopter, AdopterComplement, File } from "../domains";

export default class AdopterController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.createComplement = this.createComplement.bind(this);
        this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req, res, next) {
        const adopter = new Adopter(req.body);

        const domain = {
            ...adopter,
            password: req.body.password,
        };

        const factory = new CreateAdopterFactory();
        const result = await factory.execute(domain);
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

    async deleteLogicallyById(req, res, next) {
        const adopter = new Adopter({ id: req.params.id });
        const factory = new DeleteLogicallyByAdopterIdFactory();
        const result = await factory.execute(adopter, {}, req.loggedUserInfo);
        res.json(result);
    }

    async update(req, res, next) {
        const adopter = new Adopter({
            ...req.body,
            id: req.loggedUserInfo.userId,
        });
        const factory = new UpdateAdopterFactory();
        const result = await factory.execute(adopter);
        res.json(result);
    }

    async updateProfileImage(req, res, next) {
        const adopter = new File(req.file);
        const factory = new UpdateProfileImageAdopterFactory();
        const result = await factory.execute(adopter, {}, req.loggedUserInfo);
        res.json(result);
    }
}
