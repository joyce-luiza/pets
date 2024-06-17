import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAllOrganizationsCityStateCommand extends AbstractCommand {
  /**
   * Creates an instance of GetAllOrganizationsCityStateCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.getAllOrganizationsCityState(req, res, next);
  }
}
