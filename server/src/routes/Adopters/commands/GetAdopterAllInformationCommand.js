import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAdopterAllInformationCommand extends AbstractCommand {
    /**
     * Creates an instance of GetAdopterAllInformationCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getAdopterAllInformation(req, res, next);
    }
}
