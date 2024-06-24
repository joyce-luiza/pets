import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class UpdateAdopterPreferencesCommand extends AbstractCommand {
  /**
   * Creates an instance of UpdateAdopterPreferencesCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.updateAdopterPreferences(req, res, next);
  }
}
