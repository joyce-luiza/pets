import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetByEmailCommand extends AbstractCommand {
    /**
     * Creates an instance of GetByEmailCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getByEmail(req, res, next);
    }
}
