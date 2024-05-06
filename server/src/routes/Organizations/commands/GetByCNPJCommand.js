import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetByCNPJCommand extends AbstractCommand {
    /**
     * Creates an instance of GetByCNPJCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getByCNPJ(req, res, next);
    }
}
