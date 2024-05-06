import AbstractFacade from "../abstract/AbstractFacade";
import GetByEmailCommand from "../../routes/OrganizationMembers/commands/GetByEmailCommand";

export default class OrganizationMemberFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.getByEmail = this.getByEmail.bind(this);
    }

    async getByEmail(req, res, next) {
        try {
            const command = new GetByEmailCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
