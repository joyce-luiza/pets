import {
    CreateCommand,
    UpdateCommand,
    GetByIdCommand,
    DeleteLogicallyCommand,
    DeleteByIdCommand,
} from "../commands";

export default class AbstractFacade {
    /**
     * Creates an instance of AbstractFacade
     * @param {AbstractController} controller - An instance of AbstractController
     */
    constructor(controller) {
        this.controller = controller;

        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.deleteLogically = this.deleteLogically.bind(this);
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

    async update(req, res, next) {
        try {
            const command = new UpdateCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteLogically(req, res, next) {
        try {
            const command = new DeleteLogicallyCommand(this.controller);
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

    handleError(res, error) {
        const { status, message, stack } = error;
        res.status(status ? status : 500).json(message);
        // console.log(stack);
    }
}
