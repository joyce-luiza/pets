import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class GetAdopterPreferencesCommand extends AbstractCommand {
  /**
   * Creates an instance of GetAdopterPreferencesCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.getAdopterPreferences(req, res, next);
  }
}
