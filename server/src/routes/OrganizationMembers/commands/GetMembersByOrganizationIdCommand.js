import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetMembersByOrganizationIdCommand extends AbstractCommand {
    /**
     * Creates an instance of GetMembersCommand
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.getMembersByOrganizationId(req, res, next);
    }
}
