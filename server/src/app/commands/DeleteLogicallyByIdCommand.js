import AbstractCommand from '../abstract/AbstractCommand';

export default class DeleteLogicallyByIdCommand extends AbstractCommand {
	/**
	 * Creates an instance of DeleteLogicallyByIdCommand
	 *
	 * @param {AbstractController} controller - An instance of AbstractController
	 */
	constructor(controller) {
		super();
		this.controller = controller;
	}

	async execute(req, res, next) {
		await this.controller.deleteLogicallyById(req, res, next);
	}
}
