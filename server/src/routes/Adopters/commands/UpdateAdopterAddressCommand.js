import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class UpdateAdopterAddressCommand extends AbstractCommand {
  /**
   * Creates an instance of UpdateAdopterAddressCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.updateAdopterAddress(req, res, next);
  }
}
