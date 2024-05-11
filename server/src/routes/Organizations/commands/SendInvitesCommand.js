import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class SendInvitesCommand extends AbstractCommand {
    /**
     * Creates an instance of SendInvitesCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.sendInvites(req, res, next);
    }
}
