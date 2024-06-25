import AbstractFacade from "../abstract/AbstractFacade";
import {
  FindAllToTableViewCommand,
  FindAllCardListViewCommand,
} from "../../routes/Animals/commands";

export default class AnimalFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.findAllToTableView = this.findAllToTableView.bind(this);
    this.findAllCardListView = this.findAllCardListView.bind(this);
  }

  async findAllToTableView(req, res, next) {
    try {
      const command = new FindAllToTableViewCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAllCardListView(req, res, next) {
    try {
      const command = new FindAllCardListViewCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
