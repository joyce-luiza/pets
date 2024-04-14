import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import auth from "../../../config/auth";
import jwt from "jsonwebtoken";
import { AdopterRepository } from "../../../app/repositories/AdopterRepository";
import { Login } from "../../../app/domains";
import { USER_TYPE } from "../../../constants";

/**
 * Strategy to do login by params
 *
 * @extends AbstractStrategy
 */
export default class DoLoginByParamsStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  /**
   * @param {Login} data - Login domain object
   */
  async execute({ email, password, token, type }) {
    if (token) return;

    let result = {};

    switch (type) {
      case USER_TYPE.ADOPTER:
        const adopter = await this.adopterRepository.findByProp("email", email);

        if (!adopter) {
          this.throwError(
            "Erro ao realizar login. Email ou senha incorretos.",
            500
          );
        }

        if (!(await adopter.checkPassword(password))) {
          this.throwError("O email ou senha estão incorretos.", 400);
        }

        const { id, firstName } = adopter;

        result = {
          id,
          firstName,
          email,
          type,
          token: jwt.sign({ id, type }, auth.secret, {
            expiresIn: auth.expiresIn,
          }),
        };
        break;

      default:
        break;
    }

    return result;
  }
}
