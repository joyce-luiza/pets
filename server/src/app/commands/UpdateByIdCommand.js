import AbstractCommand from '../abstract/AbstractCommand';

export default class UpdateByIdCommand extends AbstractCommand {
	/**
	 * Creates an instance of UpdateByIdCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.updateById(req, res, next);
	}
}
