import AbstractCommand from "../../../app/abstract/AbstractCommand";

export default class FindAllToCardListViewCommand extends AbstractCommand {
  /**
   * Creates an instance of FindAllToCardListViewCommand
   *
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    super();
    this.controller = controller;
  }

  async execute(req, res, next) {
    await this.controller.findAllToCardListView(req, res, next);
  }
}
