import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationRepository } from "../../../app/repositories";
import { GetAllOrganizationsCityStateStrategy } from "../strategies";

class GetAllOrganizationsCityStateFactory extends AbstractFactory {
  constructor() {
    super([new GetAllOrganizationsCityStateStrategy(OrganizationRepository)]);
  }
}

export default GetAllOrganizationsCityStateFactory;
