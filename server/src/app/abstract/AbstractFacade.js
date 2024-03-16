import {
  CreateCommand,
  DeleteByIdCommand,
  DeleteLogicallyByIdCommand,
  GetByIdCommand,
  UpdateByIdCommand,
  FindAllCommand,
} from "../commands";

export default class AbstractFacade {
  /**
   * Creates an instance of AbstractFacade
   * @param {AbstractController} controller - An instance of AbstractController
   */
  constructor(controller) {
    this.controller = controller;
    this.handleError = this.handleError.bind(this);

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  handleError(res, error) {
    const { status, message, stack } = error;
    res.status(status ? status : 500).json(message);
    // console.log(stack);
  }

  async create(req, res, next) {
    try {
      const command = new CreateCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req, res, next) {
    try {
      const command = new GetByIdCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateById(req, res, next) {
    try {
      const command = new UpdateByIdCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteById(req, res, next) {
    try {
      const command = new DeleteByIdCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteLogicallyById(req, res, next) {
    try {
      const command = new DeleteLogicallyByIdCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAll(req, res, next) {
    try {
      const command = new FindAllCommand(this.controller);
      await command.execute(req, res, next);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
