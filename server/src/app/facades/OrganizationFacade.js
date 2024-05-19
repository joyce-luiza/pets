import AbstractFacade from "../abstract/AbstractFacade";
import {
    GetByCNPJCommand,
    CreateComplementCommand,
    GetComplementCommand,
    CreateAdminMemberCommand,
    SendInvitesCommand,
} from "../../routes/Organizations/commands";

export default class OrganizationFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.getByCNPJ = this.getByCNPJ.bind(this);
        this.createComplement = this.createComplement.bind(this);
        this.getComplement = this.getComplement.bind(this);
    }

    async getByCNPJ(req, res, next) {
        try {
            const command = new GetByCNPJCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createComplement(req, res, next) {
        try {
            const command = new CreateComplementCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getComplement(req, res, next) {
        try {
            const command = new GetComplementCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createAdminMember(req, res, next) {
        try {
            const command = new CreateAdminMemberCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async sendInvites(req, res, next) {
        try {
            const command = new SendInvitesCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
