import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class FindAllCardListViewCommand extends AbstractCommand {
  /**
   * Creates an instance of FindAllCardListViewCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.findAllCardListView(req, res, next);
  }
}
