import AbstractCommand from '../abstract/AbstractCommand';

export default class DeleteByIdCommand extends AbstractCommand {
	/**
	 * Creates an instance of DeleteByIdCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.deleteById(req, res, next);
	}
}
