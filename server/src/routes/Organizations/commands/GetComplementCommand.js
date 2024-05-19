import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetComplementCommand extends AbstractCommand {
    /**
     * Creates an instance of GetComplementCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getComplement(req, res, next);
    }
}
