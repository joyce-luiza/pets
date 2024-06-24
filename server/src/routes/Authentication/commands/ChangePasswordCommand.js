import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class ChangePasswordCommand extends AbstractCommand {
  /**
   * Creates an instance of ChangePasswordCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.changePassword(req, res, next);
  }
}
