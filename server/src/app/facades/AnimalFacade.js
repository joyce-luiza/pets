import AbstractFacade from "../abstract/AbstractFacade";
import {
  FindAllToTableViewCommand,
  FindAllToCardListViewCommand,
} from "../../routes/Animals/commands";

export default class AnimalFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.findAllToTableView = this.findAllToTableView.bind(this);
    this.findAllToCardListView = this.findAllToCardListView.bind(this);
  }

  async findAllToTableView(req, res, next) {
    try {
      const command = new FindAllToTableViewCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAllToCardListView(req, res, next) {
    try {
      const command = new FindAllToCardListViewCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
