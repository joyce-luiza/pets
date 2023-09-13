import AbstractCommand from '../abstract/AbstractCommand';

export default class CreateCommand extends AbstractCommand {
	/**
	 * Creates an instance of CreateCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.create(req, res, next);
	}
}
