import AbstractFacade from "../abstract/AbstractFacade";
import { FindAllToTableViewCommand } from "../commands";
import { GetByAdopterIdCommand } from "../../routes/Adoptions/commands";

export default class AdoptionFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.findAllToTableView = this.findAllToTableView.bind(this);
        this.getByAdopterId = this.getByAdopterId.bind(this);
    }

    async findAllToTableView(req, res, next) {
        try {
            const command = new FindAllToTableViewCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getByAdopterId(req, res, next) {
        try {
            const command = new GetByAdopterIdCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
