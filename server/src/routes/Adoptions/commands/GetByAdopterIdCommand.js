import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetByAdopterIdCommand extends AbstractCommand {
    /**
     * Creates an instance of GetByAdopterIdCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getByAdopterId(req, res, next);
    }
}
