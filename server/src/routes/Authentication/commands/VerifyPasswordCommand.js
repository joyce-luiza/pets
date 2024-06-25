import AbstractCommand from '../../../app/abstract/AbstractCommand';

export default class VerifyPasswordCommand extends AbstractCommand {
	/**
	 * Creates an instance of VerifyPasswordCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.verifyPassword(req, res, next);
	}
}
