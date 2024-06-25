import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAdopterLifestyleCommand extends AbstractCommand {
  /**
   * Creates an instance of GetAdopterLifestyleCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.getAdopterLifestyle(req, res, next);
  }
}
