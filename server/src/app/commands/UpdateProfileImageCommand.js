import AbstractCommand from "../abstract/AbstractCommand";

export default class UpdateProfileImageCommand extends AbstractCommand {
  /**
   * Creates an instance of UpdateProfileImageCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.updateProfileImage(req, res, next);
  }
}
