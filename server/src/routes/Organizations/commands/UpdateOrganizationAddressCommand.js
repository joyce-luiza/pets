import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class UpdateOrganizationAddressCommand extends AbstractCommand {
    /**
     * Creates an instance of UpdateOrganizationAddress
     *
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async execute(req, res, next) {
        await this.controller.updateAddress(req, res, next);
    }
}
