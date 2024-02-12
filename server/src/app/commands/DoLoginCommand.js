import AbstractCommand from '../abstract/AbstractCommand';

export default class DoLoginCommand extends AbstractCommand {
	/**
	 * Creates an instance of DoLoginCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.doLogin(req, res, next);
	}
}
