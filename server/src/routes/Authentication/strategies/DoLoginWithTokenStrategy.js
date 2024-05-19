import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import auth from "../../../config/auth";
import jwt from "jsonwebtoken";
import { AdopterRepository } from "../../../app/repositories/AdopterRepository";
import { Login } from "../../../app/domains";
import { USER_TYPE } from "../../../constants";
import { promisify } from "util";
/**
 * Strategy to do login by token
 *
 * @extends AbstractStrategy
 */
export default class DoLoginWithTokenStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   * @param {OrganizationMemberRepository} organizationMemberRepository
   */
  constructor(adopterRepository, organizationMemberRepository) {
    super();
    this.organizationMemberRepository = organizationMemberRepository;
    this.adopterRepository = adopterRepository;
  }

  /**
   * @param {Login} data - Login domain object
   */
  async execute({ token, type }) {
    if (!token) return;

    const verifiedToken = await promisify(jwt.verify)(token, auth.secret);

    if (!verifiedToken) {
      this.throwError("O token informado não é válido.", 400);
      return;
    }

    let result = {};
    let { id, firstName, email, organizationId, role } = {};

    switch (type) {
      case USER_TYPE.ADOPTER:
        const adopter = await this.adopterRepository.findById(verifiedToken.id);

        if (!adopter) {
          this.throwError(
            "Não foi possível recuperar os dados do adotante.",
            500
          );
        }

        ({ id, firstName, email } = adopter);

        result = {
          id,
          firstName,
          email,
          type,
          imageUrl: adopter.imageUrl ? adopter.imageUrl : "",
          token: jwt.sign({ id, type: verifiedToken.type }, auth.secret, {
            expiresIn: auth.expiresIn,
          }),
        };
        break;
      case USER_TYPE.ORGANIZATION:
        const orgMember = await this.organizationMemberRepository.findById(
          verifiedToken.id
        );

        if (!orgMember) {
          this.throwError(
            "Não foi possível recuperar os dados do usuário.",
            500
          );
        }

        const { organizationId, role } = orgMember;

        result = {
          id: orgMember.id,
          firstName: orgMember.firstName,
          email: orgMember.email,
          type,
          role,
          organizationId,
          imageUrl: orgMember.imageUrl ? orgMember.imageUrl : "",
          token: jwt.sign({ id, type: verifiedToken.type }, auth.secret, {
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
