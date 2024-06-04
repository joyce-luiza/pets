import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import {
  FindOrganizationMemberAndUpdateProfileImageStrategy,
  ValidateEmailExistenceStrategy,
} from "../strategies";

class UpdateProfileImageMemberFactory extends AbstractFactory {
  constructor() {
    super([
      new FindOrganizationMemberAndUpdateProfileImageStrategy(
        OrganizationMemberRepository
      ),
    ]);
  }
}

export default UpdateProfileImageMemberFactory;
