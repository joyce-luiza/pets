import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class CreateAdminMemberCommand extends AbstractCommand {
    /**
     * Creates an instance of CreateAdminMemberCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.createAdminMember(req, res, next);
    }
}
