import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class CreateComplementCommand extends AbstractCommand {
    /**
     * Creates an instance of CreateComplementCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.createComplement(req, res, next);
    }
}
