import AbstractFacade from "../abstract/AbstractFacade";
import CreateComplementCommand from "../../routes/Adopters/commands/CreateComplementCommand";

export default class AdopterFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.createComplement = this.createComplement.bind(this);
  }

  async createComplement(req, res, next) {
    try {
      const command = new CreateComplementCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
