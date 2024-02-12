export default class Login {
	constructor({ email = '', password = '', token = '', type = '' } = {}) {
		this.email = email;
		this.password = password;
		this.token = token;
		this.type = type;
	}
}
