import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class UpdateMemberRoleCommand extends AbstractCommand {
    /**
     * Creates an instance of UpdateMemberRoleCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.updateMemberRole(req, res, next);
    }
}
