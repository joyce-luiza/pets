import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class UpdateAdopterLifestyleCommand extends AbstractCommand {
  /**
   * Creates an instance of UpdateAdopterLifestyleCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.updateAdopterLifestyle(req, res, next);
  }
}
