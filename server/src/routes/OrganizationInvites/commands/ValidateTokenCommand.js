import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class ValidateTokenCommand extends AbstractCommand {
    /**
     * Creates an instance of ValidateTokenCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.validateToken(req, res, next);
    }
}
