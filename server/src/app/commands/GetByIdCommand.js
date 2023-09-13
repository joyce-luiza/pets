import AbstractCommand from '../abstract/AbstractCommand';

export default class GetByIdCommand extends AbstractCommand {
	/**
	 * Creates an instance of GetByIdCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.getById(req, res, next);
	}
}
