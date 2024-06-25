import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class VerifyAdoptionInProgressCommand extends AbstractCommand {
    /**
     * Creates an instance of VerifyAdoptionInProgressCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.verifyAdoptionInProgress(req, res, next);
    }
}
