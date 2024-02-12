import AbstractFacade from '../abstract/AbstractFacade';
import { DoLoginCommand } from '../commands';

export default class AuthenticationFacade extends AbstractFacade {
	constructor(controller) {
		super(controller);
		this.doLogin = this.doLogin.bind(this);
	}

	async doLogin(req, res, next) {
		try {
			const command = new DoLoginCommand(this.controller);
			await command.execute(req, res, next);
		} catch (error) {
			this.handleError(res, error);
		}
	}
}
