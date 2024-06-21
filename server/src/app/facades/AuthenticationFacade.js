import AbstractFacade from '../abstract/AbstractFacade';
import { DoLoginCommand, VerifyPasswordCommand } from '../commands';

export default class AuthenticationFacade extends AbstractFacade {
	constructor(controller) {
		super(controller);
		this.doLogin = this.doLogin.bind(this);
		this.verifyPassword = this.verifyPassword.bind(this);
	}

	async doLogin(req, res, next) {
		try {
			const command = new DoLoginCommand(this.controller);
			await command.execute(req, res, next);
		} catch (error) {
			this.handleError(res, error);
		}
	}

	async verifyPassword(req, res, next) {
		try {
			const command = new VerifyPasswordCommand(this.controller);
			await command.execute(req, res, next);
		} catch (error) {
			this.handleError(res, error);
		}
	}
}
