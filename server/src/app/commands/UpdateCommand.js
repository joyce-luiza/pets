import AbstractCommand from "../abstract/AbstractCommand";

export default class UpdateCommand extends AbstractCommand {
  /**
   * Creates an instance of UpdateCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.update(req, res, next);
  }
}
