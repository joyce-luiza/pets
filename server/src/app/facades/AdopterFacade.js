import {
    CreateComplementCommand,
    GetAdopterAddressCommand,
    GetByEmailCommand,
    UpdateAdopterAddressCommand,
    GetAdopterPreferencesCommand,
    UpdateAdopterPreferencesCommand,
    GetAdopterAllInformationCommand,
} from "../../routes/Adopters/commands";
import AbstractFacade from "../abstract/AbstractFacade";
import { UpdateProfileImageCommand } from "../commands";

export default class AdopterFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.createComplement = this.createComplement.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getAdopterAddress = this.getAdopterAddress.bind(this);
        this.updateAdopterAddress = this.updateAdopterAddress.bind(this);
        this.getAdopterPreferences = this.getAdopterPreferences.bind(this);
        this.updateAdopterPreferences =
            this.updateAdopterPreferences.bind(this);
        this.getAdopterAllInformation =
            this.getAdopterAllInformation.bind(this);
    }

    async createComplement(req, res, next) {
        try {
            const command = new CreateComplementCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateProfileImage(req, res, next) {
        try {
            const command = new UpdateProfileImageCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getByEmail(req, res, next) {
        try {
            const command = new GetByEmailCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAdopterAddress(req, res, next) {
        try {
            const command = new GetAdopterAddressCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateAdopterAddress(req, res, next) {
        try {
            const command = new UpdateAdopterAddressCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAdopterPreferences(req, res, next) {
        try {
            const command = new GetAdopterPreferencesCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateAdopterPreferences(req, res, next) {
        try {
            const command = new UpdateAdopterPreferencesCommand(
                this.controller
            );
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAdopterAllInformation(req, res, next) {
        try {
            const command = new GetAdopterAllInformationCommand(
                this.controller
            );
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
