import LoginFactory from '../../routes/Authentication/factories/LoginFactory';
import { Login } from '../domains';

export default class AuthenticationController {
	constructor() {
		this.doLogin = this.doLogin.bind(this);
	}

	async doLogin(req, res, next) {
		const loginInput = new Login(req.body);
		const factory = new LoginFactory();
		const result = await factory.execute(loginInput);
		res.json(result);
	}
}
