import AbstractFactory from "../../../app/abstract/AbstractFactory";

import {
  AdopterRepository,
  OrganizationMemberRepository,
} from "../../../app/repositories";
import { ValidateRequiredFieldsToUpdateUserPasswordStrategy } from "../strategies";
import ChangeUserPasswordStrategy from "../strategies/ChangeUserPasswordStrategy";

class ChangePasswordFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateRequiredFieldsToUpdateUserPasswordStrategy(),
      new ChangeUserPasswordStrategy(
        AdopterRepository,
        OrganizationMemberRepository
      ),
    ]);
  }
}

export default ChangePasswordFactory;
