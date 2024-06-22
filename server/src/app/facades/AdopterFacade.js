import {
  CreateComplementCommand,
  GetAdopterAddressCommand,
  GetByEmailCommand,
  UpdateAdopterAddressCommand,
} from "../../routes/Adopters/commands";
import AbstractFacade from "../abstract/AbstractFacade";
import { UpdateProfileImageCommand } from "../commands";

export default class AdopterFacade extends AbstractFacade {
  constructor(controller) {
    super(controller);
    this.createComplement = this.createComplement.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
    this.getAdopterAddress = this.getAdopterAddress.bind(this);
    this.updateAdopterAddress = this.updateAdopterAddress.bind(this);
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

  async getByEmail(req, res, next) {
    try {
      const command = new GetByEmailCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getAdopterAddress(req, res, next) {
    try {
      const command = new GetAdopterAddressCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
  async updateAdopterAddress(req, res, next) {
    try {
      const command = new UpdateAdopterAddressCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
