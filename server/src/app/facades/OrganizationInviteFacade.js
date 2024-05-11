import AbstractFacade from "../abstract/AbstractFacade";
import { ValidateTokenCommand } from "../../routes/OrganizationInvites/commands";

export default class OrganizationInviteFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.validateToken = this.validateToken.bind(this);
    }

    async validateToken(req, res, next) {
        try {
            const command = new ValidateTokenCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
