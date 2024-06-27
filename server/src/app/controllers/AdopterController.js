import {
    CreateAdopterFactory,
    GetByIdAdopterFactory,
    CreateAdopterLifestyleAndPreferencesFactory,
    DeleteLogicallyByAdopterIdFactory,
    UpdateAdopterFactory,
    UpdateProfileImageAdopterFactory,
    GetByEmailAdopterFactory,
    GetAdopterAddressAdopterFactory,
    UpdateAdopterAddressAdopterFactory,
    GetAdopterPreferencesFactory,
    UpdateAdopterPreferencesFactory,
    GetAdopterLifestyleFactory,
    UpdateAdopterLifestyleFactory,
    GetAdopterAllInformationFactory,
} from "../../routes/Adopters/factories";
import { Address, Adopter, AdopterComplement, File } from "../domains";

export default class AdopterController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.createComplement = this.createComplement.bind(this);
        this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
        this.update = this.update.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        this.getAdopterAddress = this.getAdopterAddress.bind(this);
        this.updateAdopterAddress = this.updateAdopterAddress.bind(this);
        this.getAdopterPreferences = this.getAdopterPreferences.bind(this);
        this.updateAdopterPreferences =
            this.updateAdopterPreferences.bind(this);
        this.getAdopterLifestyle = this.getAdopterLifestyle.bind(this);
        this.updateAdopterLifestyle = this.updateAdopterLifestyle.bind(this);
        this.getAdopterAllInformation =
            this.getAdopterAllInformation.bind(this);
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

    async getByEmail(req, res, next) {
        const adopter = new Adopter({ email: req.params.email });
        const factory = new GetByEmailAdopterFactory();
        const result = await factory.execute(adopter);
        res.json(result);
    }

    async getAdopterAllInformation(req, res, next) {
        const adopter = new Adopter({ id: req.params.id });
        const factory = new GetAdopterAllInformationFactory();
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
        const result = await factory.execute(adopter, req.loggedUserInfo);
        res.json(result);
    }

    async deleteLogicallyById(req, res, next) {
        const adopter = new Adopter({ id: req.params.id });
        const factory = new DeleteLogicallyByAdopterIdFactory();
        const result = await factory.execute(adopter, req.loggedUserInfo);
        res.json(result);
    }

    async update(req, res, next) {
        const adopter = new Adopter({
            ...req.body,
        });
        const factory = new UpdateAdopterFactory();
        const result = await factory.execute(adopter, req.loggedUserInfo);
        res.json(result);
    }

    async updateProfileImage(req, res, next) {
        const adopter = new File(req.file);
        const factory = new UpdateProfileImageAdopterFactory();
        const result = await factory.execute(adopter, req.loggedUserInfo);
        res.json(result);
    }

    async getAdopterAddress(req, res, next) {
        const factory = new GetAdopterAddressAdopterFactory();
        const result = await factory.execute(null, req.loggedUserInfo);
        res.json(result);
    }

    async updateAdopterAddress(req, res, next) {
        const domain = new Address(req.body);
        const factory = new UpdateAdopterAddressAdopterFactory();
        const result = await factory.execute(domain, req.loggedUserInfo);
        res.json(result);
    }

    async getAdopterPreferences(req, res, next) {
        const factory = new GetAdopterPreferencesFactory();
        const result = await factory.execute(null, req.loggedUserInfo);
        res.json(result);
    }

    async updateAdopterPreferences(req, res, next) {
        const domain = new AdopterComplement({
            preferences: req.body,
        });
        const factory = new UpdateAdopterPreferencesFactory();
        const result = await factory.execute(domain, req.loggedUserInfo);
        res.json(result);
    }

    async getAdopterLifestyle(req, res, next) {
        const factory = new GetAdopterLifestyleFactory();
        const result = await factory.execute(null, req.loggedUserInfo);
        res.json(result);
    }

    async updateAdopterLifestyle(req, res, next) {
        const domain = new AdopterComplement({
            lifestyle: req.body,
        });
        const factory = new UpdateAdopterLifestyleFactory();
        const result = await factory.execute(domain, req.loggedUserInfo);
        res.json(result);
    }
}
