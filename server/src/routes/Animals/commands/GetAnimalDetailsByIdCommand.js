import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAnimalDetailsByIdCommand extends AbstractCommand {
    /**
     * Creates an instance of GetAnimalDetailsByIdCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getAnimalDetailsById(req, res, next);
    }
}
