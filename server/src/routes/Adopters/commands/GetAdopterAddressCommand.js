import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAdopterAddressCommand extends AbstractCommand {
  /**
   * Creates an instance of GetAdopterAddressCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.getAdopterAddress(req, res, next);
  }
}
