import AbstractFacade from "../abstract/AbstractFacade";
import { FindAllToTableViewCommand } from "../../routes/Animals/commands";

export default class AnimalFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.findAllToTableView = this.findAllToTableView.bind(this);
  }

  async findAllToTableView(req, res, next) {
    try {
      const command = new FindAllToTableViewCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
