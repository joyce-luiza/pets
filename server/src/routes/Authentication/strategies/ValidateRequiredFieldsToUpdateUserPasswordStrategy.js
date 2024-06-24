import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { USER_TYPE } from "../../../constants";

/**
 * Strategy to validade required fields to compare with logged user password
 *
 * @extends AbstractStrategy
 */
export default class ValidateRequiredFieldsToUpdateUserPasswordStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {} data
   * @param dto
   */
  async execute({ currentPassword, newPassword }, {}, loggedUserInfo) {
    const generateError = () => {
      this.throwError(`Campo obrigatório não informado`, 400);
    };

    if (!currentPassword) generateError();
    if (!newPassword) generateError();
    if (!loggedUserInfo.userId) generateError();
    if (
      !loggedUserInfo.type ||
      !Object.values(USER_TYPE).includes(loggedUserInfo.type)
    )
      generateError();

    if (
      loggedUserInfo.type === USER_TYPE.ORGANIZATION &&
      !loggedUserInfo.organizationId
    )
      generateError();
  }
}
