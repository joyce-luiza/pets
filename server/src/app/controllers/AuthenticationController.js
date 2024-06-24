import {
  LoginFactory,
  VerifyPasswordFactory,
  ChangePasswordFactory,
} from "../../routes/Authentication/factories";
import { Login } from "../domains";

export default class AuthenticationController {
  constructor() {
    this.doLogin = this.doLogin.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async doLogin(req, res, next) {
    const loginInput = new Login(req.body);
    const factory = new LoginFactory();
    const result = await factory.execute(loginInput);
    res.json(result);
  }

  async verifyPassword(req, res, next) {
    const factory = new VerifyPasswordFactory();
    const result = await factory.execute(
      { password: req.body?.password },
      req.loggedUserInfo
    );
    res.json(result);
  }

  async changePassword(req, res, next) {
    const factory = new ChangePasswordFactory();
    const result = await factory.execute(
      {
        currentPassword: req.body?.currentPassword,
        newPassword: req.body?.newPassword,
      },
      req.loggedUserInfo
    );
    res.json(result);
  }
}
