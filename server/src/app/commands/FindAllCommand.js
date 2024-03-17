import AbstractCommand from "../abstract/AbstractCommand";

export default class FindAllCommand extends AbstractCommand {
  /**
   * Creates an instance of FindAllCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.findAll(req, res, next);
  }
}
