import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import auth from "../../../config/auth";
import jwt from "jsonwebtoken";
import {
  AdopterRepository,
  OrganizationMemberRepository,
} from "../../../app/repositories";
import { Login } from "../../../app/domains";
import { USER_TYPE } from "../../../constants";

/**
 * Strategy to do login by params
 *
 * @extends AbstractStrategy
 */
export default class ChangeUserPasswordStrategy extends AbstractStrategy {
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
  async execute(
    { currentPassword, newPassword },
    dto,
    { type, organizationId, userId }
  ) {
    switch (type) {
      case USER_TYPE.ADOPTER: {
        const adopter = await this.adopterRepository.findOne({
          where: {
            id: userId,
            statusId: await this.adopterRepository.getActiveStatusId(),
          },
        });

        if (!adopter) {
          this.throwError("Nenhum usuário encontrado", 400);
        }

        if (!(await adopter.checkPassword(currentPassword))) {
          this.throwError("Senha atual incorreta", 400);
        }

        await this.adopterRepository.update(
          { password: newPassword },
          { id: userId }
        );
        break;
      }
      case USER_TYPE.ORGANIZATION: {
        const orgMember = await this.organizationMemberRepository.findOne({
          where: {
            id: userId,
            organizationId,
            statusId:
              await this.organizationMemberRepository.getActiveStatusId(),
          },
        });

        if (!orgMember) {
          this.throwError("Nenhum usuário encontrado", 400);
        }

        if (!(await orgMember.checkPassword(currentPassword))) {
          this.throwError("Senha atual incorreta", 400);
        }

        await this.organizationMemberRepository.update(
          { password: newPassword },
          {
            id: userId,
            organizationId,
          }
        );
        break;
      }

      default:
        this.throwError("Não foi possível prosseguir com a solicitação.", 401);
        break;
    }
  }
}
