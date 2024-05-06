import {
  CreateComplementCommand,
  UpdateProfileImageCommand,
} from "../../routes/Adopters/commands";
import AbstractFacade from "../abstract/AbstractFacade";

export default class AdopterFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.createComplement = this.createComplement.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
  }

  async createComplement(req, res, next) {
    try {
      const command = new CreateComplementCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateProfileImage(req, res, next) {
    try {
      const command = new UpdateProfileImageCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
