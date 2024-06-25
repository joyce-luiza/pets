import AbstractCommand from "../abstract/AbstractCommand";

export default class FindAllToTableViewCommand extends AbstractCommand {
    /**
     * Creates an instance of FindAllToTableViewCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.findAllToTableView(req, res, next);
    }
}
